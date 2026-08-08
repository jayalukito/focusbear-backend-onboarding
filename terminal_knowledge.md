# Terminal Setup & Knowledge

## 1. Which terminal client did you choose? Why?
I chose Windows Terminal with PowerShell as my primary client. Given the amount of time I spend working with Active Directory, Group Policy Objects, and the .NET ecosystem for my C# applications, PowerShell provides seamless integration and powerful object-based scripting capabilities. Windows Terminal allows me to easily manage multiple tabs, which is perfect when I need to simultaneously run a Python environment for model training and a local server for my Next.js projects.

## 2. What customizations (if any) did you make?
I customized my Windows Terminal settings by editing the `settings.json` file to apply the "One Half Dark" color scheme to reduce eye strain. I also installed a Nerd Font to ensure glyphs and icons render correctly in the prompt. Furthermore, I added several aliases to my `$PROFILE` configuration (e.g., `Set-Alias -Name ls -Value Get-ChildItem` and `Set-Alias -Name rm -Value Remove-Item`) to bring familiar Unix-style directory navigation to PowerShell.

## 3. What was the most useful command you learned today?
The most useful command I learned is `notepad $PROFILE`, which instantly opens the PowerShell profile configuration file. This allows me to rapidly define custom functions or new aliases—such as an alias to quickly spin up my local MongoDB instance or activate my PyTorch virtual environment—without needing to manually hunt down the configuration file's location in my local app data directories.
