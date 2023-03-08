$npm_dir = Join-Path $PSScriptRoot '.\book_collection_front'
$npm_command = 'npm start'

$py_dir = Join-Path $PSScriptRoot '.\book_collection_back\no_sql_version'
$py_command = 'py -m uvicorn main:app --reload'

# Start the two applications in separate processes
Start-Process -FilePath 'cmd.exe' -ArgumentList "/c cd `"$npm_dir`" && $npm_command" -WorkingDirectory $npm_dir -NoNewWindow
Start-Process -FilePath 'cmd.exe' -ArgumentList "/c cd `"$py_dir`" && $py_command" -WorkingDirectory $py_dir -NoNewWindow

# Wait for both processes to finish
Get-Process -Name 'npm', 'python' | Wait-Process