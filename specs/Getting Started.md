<table align="center"><tr><td colspan="4" align="center" width="9999">

<br/>
<img src="/specs/AnconProtocoLogo.jpg" align="center" width="300" alt="Ancon Protocol Logo" />

# Getting started
  
<br/>
</td></tr>
</table>

# Ancon Protocol Chain v0.1.0
1. Clone [this repo](https://github.com/Electronic-Signatures-Industries/ancon-protocol) 
2. Install [starport](https://docs.starport.network/guide/install.html)
3. Run `starport chain serve -r`
4. Save the mnemonic & account
# AnconJS Sample Client
1. Clone the [client repo](https://github.com/Electronic-Signatures-Industries/xdv-document-signer)
2. Install [Node v16](https://nodejs.org/)
3. Run `npm install` 
4. Git checkout ``ancon`` branch
5. Install [Binance Wallet extension](https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp) & import this testnet mnemonic:
  ``` 
  soda comic bachelor scheme absent embrace case toddler medal scrub obtain glad
  ```
  Use this mnemonic for testing only

6. Run the web app with ``npm run serve``
7. Connect & enter the saved mnemonic on the passphrase field 
   ![alt text](/specs/Demo/1DemoAncon.png)
   
   ![alt text](/specs/Demo/2DemoAncon.png)
8. Upload file
   ![alt text](/specs/Demo/3DemoAncon.png)
   ![alt text](/specs/Demo/4DemoAncon.png)
9.  Create
    ![alt text](/specs/Demo/5DemoAncon.png)
10. Result using the Ancon Index
    ![alt text](/specs/Demo/6DemoAncon.png)
    ![alt text](/specs/Demo/7DemoAncon.png)

# Known Issues
- Must erase the local index db every time the mnemonic is changed.
