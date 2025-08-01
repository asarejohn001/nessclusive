# Connect to Azure
Connect-AzAccount

# Check if AzStaticWebApp module is installed
Get-Module -ListAvailable Az*

# Create a resource group
New-AzResourceGroup `
    -Name "rg-NessclusiveRg" `
    -Location "East US2"

# Create a static web app
New-AzStaticWebApp `
    -Name         "NessclsuiveShop" `
    -ResourceGroupName "rg-NessclusiveRg" `
    -Location     "East US2" `
    -Sku          "Free" `
    -Branch "main" `
    -RepositoryUrl "https://github.com/asarejohn001/nessclusive.git" `
    -AppLocation  "." `
    -ApiLocation  "" `
    -OutputLocation ""




