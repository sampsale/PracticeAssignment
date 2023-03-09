import subprocess

# Change the directory to the one where your npm application is located
npm_dir = r'.\book_collection_front'
npm_command = 'npm start'

# Change the directory to the one where your Python application is located
py_dir = r'.\book_collection_back'

# depending on which version you want to use, uncomment/comment the below lines accordingly 
# py_version = 'sql_version.'
py_version = 'no_sql_version.'
 
py_command = f'uvicorn {py_version}main:app --reload'

# Start the two applications in separate processes
npm_process = subprocess.Popen(npm_command, cwd=npm_dir, shell=True)
py_process = subprocess.Popen(py_command, cwd=py_dir, shell=True)

# Wait for both processes to finish
npm_process.wait()
py_process.wait()