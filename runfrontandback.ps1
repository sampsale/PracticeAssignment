$npm_dir = Join-Path $PSScriptRoot '.\book_collection_front'
$npm_command = 'npm start'

$py_dir = Join-Path $PSScriptRoot '.\book_collection_back/'
# if you want to use the sql version, change the line below to: $py_version = 'sql_version.'
$py_version = 'no_sql_version.'

$py_command = "uvicorn  ${py_version}main:app --reload"

# Start the two applications in separate processes
Start-Process -FilePath 'cmd.exe' -ArgumentList "/c cd `"$npm_dir`" && $npm_command" -WorkingDirectory $npm_dir -NoNewWindow
Start-Process -FilePath 'cmd.exe' -ArgumentList "/c cd `"$py_dir`" && $py_command" -WorkingDirectory $py_dir -NoNewWindow

# Wait for both processes to finish
Get-Process -Name 'npm', 'python' | Wait-Process