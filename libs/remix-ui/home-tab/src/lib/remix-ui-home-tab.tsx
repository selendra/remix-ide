import React, { useState, useEffect, useContext } from 'react' // eslint-disable-line

import './remix-ui-home-tab.css'
import { ThemeContext, themes } from './themeContext'
import HomeTabTitle from './components/homeTabTitle'
import HomeTabFile from './components/homeTabFile'
import HomeTabLearn from './components/homeTabLearn'
import HomeTabScamAlert from './components/homeTabScamAlert'
import HomeTabGetStarted from './components/homeTabGetStarted'
import HomeTabFeatured from './components/homeTabFeatured'
import HomeTabFeaturedPlugins from './components/homeTabFeaturedPlugins'
import { appPlatformTypes, platformContext } from '@remix-ui/app'
import { HomeTabFileElectron } from './components/homeTabFileElectron'
import { LanguageOptions } from './components/homeTablangOptions'


declare global {
  interface Window {
    _paq: any
    ethereum: any
  }
}

export interface RemixUiHomeTabProps {
  plugin: any
}

/**
 * add the selendra network to metamask / w/e
 */
async function add_sel(test: boolean = false) {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x" + (test ? 1953 : 1961).toString(16),
          chainName: "Selendra" + (test ? " Testnet" : ''),
          rpcUrls: [test ? "https://rpc0-testnet.selendra.org" : "https://rpc0.selendra.org"],
          nativeCurrency: {
            decimals: 18,
            name: "Selendra",
            symbol: "SEL",
          },
          iconUrls: ["https://avatars.githubusercontent.com/u/49308834"]
        }
      ]
    })
  }
  catch (e) {
    if (e.code == 4001) {
      alert("pls press yes?");
    } else {
      console.error(e)
      alert("you haven't installed fox app!")
    }
  }
}

async function add_testnet() {
  await add_sel(true)
}


export const RemixUiHomeTab = (props: RemixUiHomeTabProps) => {
  const platform = useContext(platformContext)
  const { plugin } = props

  const [state, setState] = useState<{
    themeQuality: { filter: string; name: string }
  }>({
    themeQuality: themes.light
  })

  useEffect(() => {
    plugin.call('theme', 'currentTheme').then((theme) => {
      // update theme quality. To be used for for images
      setState((prevState) => {
        return {
          ...prevState,
          themeQuality: theme.quality === 'dark' ? themes.dark : themes.light
        }
      })
    })
    plugin.on('theme', 'themeChanged', (theme) => {
      // update theme quality. To be used for for images
      setState((prevState) => {
        return {
          ...prevState,
          themeQuality: theme.quality === 'dark' ? themes.dark : themes.light
        }
      })
    })
  }, [])

  return (
    <div className="d-flex flex-column w-100" data-id="remixUIHTAll">
      <ThemeContext.Provider value={state.themeQuality}>
        <div className="d-flex flex-row w-100 custom_home_bg">
          <div className="px-2 pl-3 justify-content-start d-flex border-right flex-column" id="remixUIHTLeft" style={{ width: 'inherit' }}>
            <HomeTabTitle />
          </div>
          <div className="pl-2 pr-3 justify-content-start d-flex flex-column" style={{ width: '65%' }} id="remixUIHTRight">
            <LanguageOptions plugin={plugin} />
          </div>
        </div>

        <h3 style={{ marginLeft: 25 }}>
          Getting started
        </h3>
        <div className="px-2 pl-3 justify-content-start d-flex border-right flex-column" id="remixUIHTLeft" style={{ width: 'inherit', marginLeft: 25 }}>
          <ul>
            <li>install the <a href="https://metamask.io/download/" target="_blank">Metamask</a> browser addon.</li>
            <li>
              add the selendra mainnet: <img onClick={async () => { await add_sel(); }} src="assets/img/selendra.svg" title="press that button" height={40}></img>
            </li>
            <li>
              add the selendra testnet: <img onClick={async () => { await add_sel(true); }} src="assets/img/seltest.svg" title="press that button" height={40}></img>
            </li>
            <li>(please note these buttons do nothing if selendra is already added as a network)</li>
            <li>create a new workspace</li>
            <li>open the token solidity file</li>
            <li>go to the <img src="assets/img/solidity.webp" className="invert dark remixui_image" height={18}></img> compile tab (its on the left)</li>
            <li>press the "compile" button</li>
            <li>go to the <img src="assets/img/deployAndRun.webp" className="invert dark remixui_image" height={18}></img> deploy tab</li>
            <li>press the deploy button</li>
            <li>profit</li>
          </ul>
        </div>
      </ThemeContext.Provider >
    </div >
  )
}

export default RemixUiHomeTab
