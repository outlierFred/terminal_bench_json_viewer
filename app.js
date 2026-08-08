const TARGET_FIELDS = [
  "anti_cheating_1",
  "artifact_boundary_integrity_2",
  "difficulty_calibration_3",
  "hidden_requirement_gap_6",
  "metadata_accuracy_9",
  "oracle_correctness_11",
  "outcome_only_scoring_13",
  "reproducibility_14",
  "resource_config_15",
  "reviewability_16",
  "task_security_17",
  "test_instruction_alignment_18",
  "test_resilience_19",
  "trajectory_reward_hacking_20",
  "vacuous_pass_21",
  "verifier_calibration_22",
  "instruction_style",
  "doc_drift",
  "env_hygiene",
  "housekeeping",
];

const jsonInput = document.getElementById("json-input");
const renderButton = document.getElementById("render-json");
const fileInput = document.getElementById("json-file");
const hidePassToggle = document.getElementById("hide-pass-toggle");
const resultsContainer = document.getElementById("results");
const summaryContainer = document.getElementById("summary");
const statusMessage = document.getElementById("status-message");
const cardTemplate = document.getElementById("result-card-template");

function normalizeValue(value) {
  if (typeof value === "string") {
    return value;
  }

  if (value === null || value === undefined) {
    return "";
  }

  return JSON.stringify(value, null, 2);
}

function classifyStatus(text) {
  const normalized = text.trim().toUpperCase();

  if (normalized.startsWith("PASS:")) {
    return "pass";
  }

  if (normalized.startsWith("FAIL:")) {
    return "fail";
  }

  return "unknown";
}

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}

function extractMetadata(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("The JSON root must be an object.");
  }

  const metadata = payload.metadata;

  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new Error('Expected a top-level "metadata" object.');
  }

  return TARGET_FIELDS.map((field) => {
    const rawValue = normalizeValue(metadata[field]);
    return {
      field,
      text: rawValue,
      status: classifyStatus(rawValue),
      missing: rawValue.length === 0,
    };
  });
}

function buildSummary(items) {
  const total = items.length;
  const passCount = items.filter((item) => item.status === "pass").length;
  const failCount = items.filter((item) => item.status === "fail").length;
  const unknownCount = items.filter(
    (item) => item.status === "unknown" || item.missing,
  ).length;

  summaryContainer.innerHTML = "";
  summaryContainer.hidden = false;

  [
    { label: `Total ${total}`, className: "" },
    { label: `Pass ${passCount}`, className: "pass" },
    { label: `Fail ${failCount}`, className: "fail" },
    { label: `Other ${unknownCount}`, className: "" },
  ].forEach((item) => {
    const pill = document.createElement("div");
    pill.className = `summary-pill ${item.className}`.trim();
    pill.textContent = item.label;
    summaryContainer.appendChild(pill);
  });
}

function createEmptyState(message) {
  const empty = document.createElement("div");
  empty.className = "empty-state";
  empty.textContent = message;
  return empty;
}

function renderItems(items) {
  resultsContainer.innerHTML = "";
  buildSummary(items);

  const hidePassDetails = hidePassToggle.checked;
  const visibleItems = items.filter((item) => !(hidePassDetails && item.status === "pass"));

  if (!visibleItems.length) {
    resultsContainer.appendChild(
      createEmptyState("No failing or non-pass fields to display with the current filter."),
    );
    return;
  }

  visibleItems.forEach((item) => {
    const fragment = cardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".result-card");
    const header = fragment.querySelector(".result-header");
    const name = fragment.querySelector(".result-name");
    const badge = fragment.querySelector(".result-badge");
    const body = fragment.querySelector(".result-body");
    const text = fragment.querySelector(".result-text");

    const statusLabel = item.missing
      ? "MISSING"
      : item.status === "unknown"
        ? "CHECK"
        : item.status.toUpperCase();

    card.classList.add(item.status === "fail" ? "fail" : "pass");
    if (item.status === "unknown" || item.missing) {
      card.classList.remove("pass");
    }

    name.textContent = item.field;
    badge.textContent = statusLabel;
    text.textContent = item.missing ? "No value found for this metadata field." : item.text;

    if (item.status === "fail" || item.status === "unknown" || item.missing) {
      body.hidden = false;
      header.setAttribute("aria-expanded", "true");
    }

    header.addEventListener("click", () => {
      const expanded = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", String(!expanded));
      body.hidden = expanded;
    });

    resultsContainer.appendChild(fragment);
  });
}

function parseAndRender(sourceText) {
  try {
    const parsed = JSON.parse(sourceText);
    const items = extractMetadata(parsed);
    renderItems(items);
    setStatus(`Rendered ${items.length} metadata fields.`);
  } catch (error) {
    resultsContainer.innerHTML = "";
    summaryContainer.hidden = true;
    setStatus(error.message, true);
  }
}

renderButton.addEventListener("click", () => {
  parseAndRender(jsonInput.value);
});

hidePassToggle.addEventListener("change", () => {
  if (jsonInput.value.trim()) {
    parseAndRender(jsonInput.value);
  }
});

fileInput.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }

  const text = await file.text();
  jsonInput.value = text;
  parseAndRender(text);
});

resultsContainer.appendChild(
  createEmptyState("Upload a JSON file or paste JSON above to start reviewing metadata."),
);
