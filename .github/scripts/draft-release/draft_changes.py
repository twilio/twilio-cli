with open('.github/workflows/oclif-release.yml', 'r+') as file :
  filedata = file.read()

filedata = filedata.replace('default: twilio', 'default: twiliodraft')
filedata = filedata.replace('default: \'false\'', 'default: \'true\'')

with open('.github/workflows/oclif-release.yml', 'w') as file:
  file.write(filedata)

with open('.github/workflows/slack-notification.yml', 'r+') as file :
  filedata = file.read()

filedata = filedata.replace('debian-executable-release.yml', 'debian-draft-executable-release.yml')
filedata = filedata.replace('windows-executable-release.yml', 'windows-executable-draft-release.yml')

with open('.github/workflows/slack-notification.yml', 'w') as file:
  file.write(filedata)
print("Draft changes are ready")