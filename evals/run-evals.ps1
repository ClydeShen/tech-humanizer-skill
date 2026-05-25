# run-evals.ps1 — Windows runner that bypasses pi-node PATH hijack
# Usage:
#   .\run-evals.ps1              # run all evals
#   .\run-evals.ps1 --help       # show promptfoo help
#   .\run-evals.ps1 filter -t "humanize-legacy"  # run subset

$npx = "C:\Program Files\nodejs\npx.cmd"
& $npx promptfoo@latest eval -c evals/promptfooconfig.yaml -o evals/output.json --no-cache --no-share @args
