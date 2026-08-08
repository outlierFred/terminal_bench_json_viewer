# Metadata JSON Viewer

A lightweight static viewer for JSON files that contain a top-level `metadata` object with pass/fail text fields.

This is now a single-file app, so you can open [index.html](/Users/fredwork/Documents/ChatGPT/terminal_bench/index.html) directly in a browser without needing a local server.

## What It Does

- Ignores unrelated top-level fields.
- Reads the targeted metadata keys only.
- Highlights `PASS:` checks in green and `FAIL:` checks in red.
- Preserves line breaks from JSON strings such as `\n`.
- Lets you click each field to expand or collapse its details.
- Hides pass entries by default so failures are easier to review.

## Expected JSON Shape

```json
{
  "some_irrelevant_top_level_field": true,
  "metadata": {
    "anti_cheating_1": "FAIL: Example failure text\nMore detail here.",
    "artifact_boundary_integrity_2": "PASS: Example pass text"
  }
}
```

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

## Local Usage

Because this is a plain static site, you can open `index.html` directly in a browser.

If you prefer to serve it locally instead:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Easy Deployment From GitHub

This repo is intentionally build-free, so it deploys easily on:

- GitHub Pages
- Vercel
- Netlify

### GitHub Pages

1. Push the repo to GitHub.
2. Open `Settings` > `Pages`.
3. Set `Source` to `Deploy from a branch`.
4. Choose your default branch and `/ (root)`.

### Vercel or Netlify

1. Import the GitHub repo.
2. Keep the default static-site settings.
3. Deploy without a build command.
