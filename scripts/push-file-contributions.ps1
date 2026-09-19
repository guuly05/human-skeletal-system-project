param(
  [switch]$Push,
  [string]$Remote = 'origin',
  [string]$Branch = 'main'
)

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path

function Invoke-Git {
  param([string[]]$Arguments)

  & git -C $repoRoot @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "Git command failed: git $($Arguments -join ' ')"
  }
}

$contributions = @(
  @{ Path = '.gitignore'; Message = 'chore: add project ignore rules' },
  @{ Path = 'README.md'; Message = 'docs: document Savana Human Atlas vision' },
  @{ Path = 'package.json'; Message = 'chore: define frontend dependencies' },
  @{ Path = 'package-lock.json'; Message = 'chore: lock frontend dependencies' },
  @{ Path = 'index.html'; Message = 'feat: add application entry document' },
  @{ Path = 'tsconfig.json'; Message = 'chore: add TypeScript project references' },
  @{ Path = 'tsconfig.app.json'; Message = 'chore: configure app TypeScript compiler' },
  @{ Path = 'tsconfig.node.json'; Message = 'chore: configure Vite TypeScript compiler' },
  @{ Path = 'vite.config.ts'; Message = 'chore: configure Vite React build' },
  @{ Path = 'src/main.tsx'; Message = 'feat: mount Savana Human Atlas' },
  @{ Path = 'src/data/anatomy.ts'; Message = 'content: add initial anatomy system data' },
  @{ Path = 'src/store/useAnatomyStore.ts'; Message = 'feat: add anatomy interaction state' },
  @{ Path = 'src/components/AnatomyCanvas.tsx'; Message = 'feat: add interactive 3D anatomy canvas' },
  @{ Path = 'src/components/Interface.tsx'; Message = 'feat: add atlas interface panels' },
  @{ Path = 'src/types/lucide-react.d.ts'; Message = 'chore: add icon type declarations' },
  @{ Path = 'src/styles.css'; Message = 'ui: add Savana Human Atlas visual system' },
  @{ Path = 'src/App.tsx'; Message = 'feat: compose atlas workspace' },
  @{ Path = 'scripts/push-file-contributions.ps1'; Message = 'chore: add file contribution workflow' }
)

foreach ($contribution in $contributions) {
  $path = $contribution.Path
  $status = (& git -C $repoRoot status --porcelain -- $path)

  if (-not $status) {
    Write-Host "Skipping clean file: $path"
    continue
  }

  Write-Host "Committing: $path"
  Invoke-Git @('add', '--', $path)
  Invoke-Git @('commit', '-m', $contribution.Message)

  if ($Push) {
    Write-Host "Pushing: $path"
    Invoke-Git @('push', $Remote, "HEAD:$Branch")
  }
}

Write-Host 'File contribution workflow complete.'
