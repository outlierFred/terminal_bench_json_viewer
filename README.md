# Metadata JSON Viewer

A lightweight static web app for reviewing JSON files that contain a top-level `metadata` object with pass/fail text fields.

The viewer is designed for quick inspection of structured evaluation output. It focuses on a known set of metadata fields, highlights failures first, and keeps the interface simple enough to run anywhere as a static site.

## Features

- Reads a top-level `metadata` object from pasted JSON or an uploaded file.
- Ignores unrelated top-level fields.
- Highlights `PASS:` entries in green and `FAIL:` entries in red.
- Preserves line breaks inside metadata values.
- Expands and collapses individual fields for easier review.
- Hides pass entries by default so non-pass items are easier to scan.
- Runs entirely in the browser with no backend required.

## Expected Input

The app expects a JSON object with a top-level `metadata` key:

```json
{
  "some_irrelevant_top_level_field": true,
  "metadata": {
    "anti_cheating_1": "FAIL: Example failure text\nMore detail here.",
    "artifact_boundary_integrity_2": "PASS: Example pass text"
  }
}
```

If a tracked field is missing, the viewer marks it as missing instead of failing silently.

## Tracked Fields

- `anti_cheating_1`
- `artifact_boundary_integrity_2`
- `difficulty_calibration_3`
- `hidden_requirement_gap_6`
- `metadata_accuracy_9`
- `oracle_correctness_11`
- `outcome_only_scoring_13`
- `reproducibility_14`
- `resource_config_15`
- `reviewability_16`
- `task_security_17`
- `test_instruction_alignment_18`
- `test_resilience_19`
- `trajectory_reward_hacking_20`
- `vacuous_pass_21`
- `verifier_calibration_22`
- `instruction_style`
- `doc_drift`
- `env_hygiene`
- `housekeeping`

## Running Locally

This project has no build step and no runtime dependencies.

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).


## Project Structure

- `index.html`: app markup and template structure
- `styles.css`: visual styling
- `app.js`: JSON parsing, field extraction, filtering, and rendering logic

## Use Cases

- Reviewing metadata-based evaluation output
- Sharing a lightweight QA or rubric inspection tool
- Hosting a simple browser-based viewer without backend infrastructure
