# Upgrade Guide

[2019-06-12] 1.1.x to 1.2.x
---------------------------

Config moved from `~/.twilio` (Unix) and `%USERPROFILE%\.twilio` (Windows) to `~/.twilio-cli` and `%USERPROFILE%\.twilio-cli`, respectively.

To copy over your existing configuration, run the following commands:

* Unix
```
rm -rf ~/.twilio-cli
mv ~/.twilio/ ~/.twilio-cli/
```

* Windows
```
rmdir /S %USERPROFILE%\.twilio-cli
move %USERPROFILE%\.twilio %USERPROFILE%\.twilio-cli
```

[2019-04-29] 0.1.1 to 0.1.2
----------------------------

Config moved from `~/.config/@twilio/cli` (Unix) and `%LOCALAPPDATA%\@twilio\cli` (Windows) to `~/.twilio` and `%USERPROFILE%\.twilio`, respectively.

To copy over your existing configuration, run the following commands (Unix):
```
mkdir ~/.twilio
cp ~/.config/@twilio/cli/config.json ~/.twilio/config.json
```

##
