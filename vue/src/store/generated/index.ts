// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import ElectronicSignaturesIndustriesAnconProtocolElectronicSignaturesIndustriesAnconprotocolAnconprotocol from './Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol'
import ElectronicSignaturesIndustriesAnconProtocolElectronicSignaturesIndustriesAnconprotocolMintswap from './Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.mintswap'


export default { 
  ElectronicSignaturesIndustriesAnconProtocolElectronicSignaturesIndustriesAnconprotocolAnconprotocol: load(ElectronicSignaturesIndustriesAnconProtocolElectronicSignaturesIndustriesAnconprotocolAnconprotocol, 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'),
  ElectronicSignaturesIndustriesAnconProtocolElectronicSignaturesIndustriesAnconprotocolMintswap: load(ElectronicSignaturesIndustriesAnconProtocolElectronicSignaturesIndustriesAnconprotocolMintswap, 'ElectronicSignaturesIndustries.anconprotocol.mintswap'),
  
}


function load(mod, fullns) {
    return function init(store) {        
        if (store.hasModule([fullns])) {
            throw new Error('Duplicate module name detected: '+ fullns)
        }else{
            store.registerModule([fullns], mod)
            store.subscribe((mutation) => {
                if (mutation.type == 'common/env/INITIALIZE_WS_COMPLETE') {
                    store.dispatch(fullns+ '/init', null, {
                        root: true
                    })
                }
            })
        }
    }
}
