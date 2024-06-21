import React, { useEffect, useState } from 'react'
const { Web3 } = require('web3')
import { WarningIcon, CheckIcon } from '@chakra-ui/icons'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import './index.css'

import {
  Spinner,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
} from '@chakra-ui/react'
import Onboard from '@web3-onboard/core'
import injectedWalletModule, {
  ProviderLabel,
} from '@web3-onboard/injected-wallets'

const KAIKAS_SVG = `<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 66" width="72" height="66">
	<title>kaikas</title>
	<defs>
		<image  width="72" height="66" id="img1" href="data:image/png;base64,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"/>
	</defs>
	<style>
	</style>
	<use id="Background" href="#img1" x="0" y="0"/>
</svg>`

export default function Faucet() {
  const { siteConfig } = useDocusaurusContext()
  const KAIA_API = siteConfig.customFields.KAIA_FAUCET_API
  const [onboardInstance, setOnboardInstance] = useState()
  const [isConnected, setIsConnected] = useState(false)
  const MAINNET_RPC_URL = siteConfig.customFields.MAINNET_RPC_URL
  const TESTNET_RPC_URL = siteConfig.customFields.TESTNET_RPC_URL

  useEffect(() => {
    const kaikas = {
      label: 'Kaikas',
      injectedNamespace: 'klaytn',
      checkProviderIdentity: ({ provider }) =>
        !!provider && !!provider['isKaikas'],
      getIcon: async () => KAIKAS_SVG,
      getInterface: () => ({
        provider: window.klaytn,
      }),
      externalUrl:
        'https://chromewebstore.google.com/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi',
      platforms: ['desktop'],
    }
    let walletFilter = {}
    for (let _walletName in ProviderLabel) {
      walletFilter[_walletName] = false
    }
    walletFilter['MetaMask'] = true
    walletFilter['Rabby'] = true
    walletFilter['Kaikas'] = true

    const injected = injectedWalletModule({
      custom: [kaikas],
      displayUnavailable: [
        ProviderLabel.MetaMask,
        'Kaikas',
        ProviderLabel.Rabby,
      ],
      filter: walletFilter,
    })

    const onboard = Onboard({
      accountCenter: {
        desktop: {
          enabled: false,
        },
        mobile: {
          enabled: false,
        },
      },
      wallets: [injected],
      chains: [
        {
          id: '0x2019',
          token: 'KAIA',
          label: 'KAIA Mainnet',
          rpcUrl: MAINNET_RPC_URL,
        },
        {
          id: '0x3e9',
          token: 'KAIA',
          label: 'KAIA Kairos Testnet',
          rpcUrl: TESTNET_RPC_URL,
        },
      ],
      appMetadata: {
        name: 'Kaia Docs',
        description: 'Kaia Docs',
      },
    })
    setOnboardInstance(onboard)
  }, [])

  const [wallet, setWallet] = useState({})
  const web3 = new Web3()
  let initData = {
    wallet: '',
    balance: '0',
    isRunning: false,
    madeDate: null,
    isLoadingFaucetableBlock: true,
    showModal: false,
    buttonName: 'OK',
    isInvalidAddress: true,
    title: 'Your KAIA Faucet request accepted.',
    message: 'You can run faucet once every 24 hours.',
    faucetMessage:
      'You can run faucet once every 24 hours (last time you ran faucet was 24 hours ago).',
  }
  const [data, setData] = useState(initData)

  const toggleWalletConnect = async () => {
    try {
      if (isConnected) {
        const [primaryWallet] = onboardInstance.state.get().wallets
        await onboardInstance.disconnectWallet({ label: primaryWallet.label })
        setIsConnected(false)
      } else {
        const provider = await onboardInstance.connectWallet()
        if (provider[0].accounts && provider[0].accounts.length > 0) {
          setWallet({ address: provider[0].accounts[0].address })
          onAddressBlur(provider[0].accounts[0].address)
          setIsConnected(true)
        } else {
          setIsConnected(false)
        }
      }
    } catch (_) {}
  }

  const getFaucetableBlock = () => {
    fetch(`${KAIA_API}/faucet/time?address=${wallet.address}`, {
      method: 'GET',
    })
      .then(async function (response) {
        const responseText = await response.text()
        const result = JSON.parse(responseText)

        let madeDataSet, nowDataSet, remainingHour, remainingMinute, timeZone

        if (result && result.data) {
          madeDataSet = new Date(result.data)
          nowDataSet = new Date()

          timeZone = nowDataSet.getTimezoneOffset() / 60
          remainingHour =
            nowDataSet.getHours() - madeDataSet.getHours() + timeZone == 0
              ? 1
              : nowDataSet.getHours() - madeDataSet.getHours() + timeZone
          remainingHour =
            remainingHour >= 0 ? 24 - remainingHour : Math.abs(remainingHour)
          remainingMinute =
            60 - Math.abs(nowDataSet.getMinutes() - madeDataSet.getMinutes())

          setData((_prevData) => ({
            ..._prevData,
            isLoadingFaucetableBlock: true,
            madeDate: '',
          }))
        } else {
          console.log({
            ...data,
            isLoadingFaucetableBlock: false,
            isInvalidAddress: false,
            madeDate: 'Faucet is ready to run.',
          })
          setData((_prevData) => ({
            ..._prevData,
            isLoadingFaucetableBlock: false,
            isInvalidAddress: false,
            madeDate: 'Faucet is ready to run.',
          }))
        }
      })
      .catch(function (e) {
        console.log(e)
      })
  }

  const changeWallet = (e) => {
    if (e.target.value) {
      setWallet({
        address: e.target.value,
      })
    }
  }

  const onAddressBlur = (_address) => {
    console.log(_address)
    if (
      !web3.utils.isAddress(
        typeof _address === 'string' ? _address : wallet.address
      )
    ) {
      setData((_prevData) => ({
        ..._prevData,
        isLoadingFaucetableBlock: true,
        isInvalidAddress: true,
        madeDate: 'Invalid address',
      }))
      return
    }
    getFaucetableBlock()
    updateBalance()
  }

  const updateBalance = () => {
    fetch(`${KAIA_API}/faucet/balance?address=${wallet.address}`, {
      method: 'GET',
    })
      .then(async function (response) {
        const responseText = await response.text()
        const result = JSON.parse(responseText)
        setData((_prevData) => ({
          ..._prevData,
          balance: result.data,
        }))
      })
      .catch(function (e) {
        console.log(e)
      })
  }

  const runFaucet = () => {
    setData((_prevData) => ({ ..._prevData, isRunning: true }))
    fetch(`${KAIA_API}/faucet/run?address=${wallet && wallet.address}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then(({ status }) => {
        console.log('status', status)
        return status
      })
      .catch((err) => console.log(`Error catch: ${err}`))
      .finally(() => {
        // loading end, update data

        setTimeout(() => {
          setData((_prevData) => ({ ..._prevData, isRunning: false }))
          getFaucetableBlock()
          updateBalance()
          setData((_prevData) => ({ ..._prevData, showModal: true }))
        }, 3000)
      })
  }

  const closeModal = () => {
    setData({
      ...data,
      showModal: false,
    })
  }

  return (
    <>
      <Modal
        isOpen={data.showModal}
        onClose={closeModal}
        className="modal-container"
      >
        <ModalOverlay className="modal-overlay" />
        <ModalContent className="modal-content">
          <ModalHeader className="modal-header">{data.title}</ModalHeader>
          <ModalCloseButton className="modal-close" />
          <ModalBody className="modal-body">{data.message}</ModalBody>

          <ModalFooter>
            <Button className="modal-button" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div>
        To get the faucets
        <Button
          className="submit-button"
          mt={0}
          mr={10}
          ml={10}
          onClick={toggleWalletConnect}
        >
          {isConnected ? 'DISCONNECT WALLET' : 'CONNECT WALLET'}
        </Button>
        or Manually enter the address below.
      </div>
      <br />
      <FormControl>
        <FormLabel className="form-input-address-label">
          Account Address
        </FormLabel>
        <Input
          type="text"
          placeholder="Please put your wallet address here"
          onChange={changeWallet}
          onBlur={onAddressBlur}
          className="form-input"
          value={wallet.address}
        />
      </FormControl>
      <FormControl className="form-input-balance-label">
        <FormLabel>KAIA Balance</FormLabel>
        <InputGroup>
          <Input
            type="text"
            placeholder={'0'}
            isDisabled={true}
            value={data.balance}
            className="form-input"
          />
          <InputRightAddon className="form-input-right">KAIA</InputRightAddon>
        </InputGroup>
      </FormControl>
      <div className="input-error-message">
        {data.madeDate && (
          <>
            {data.isLoadingFaucetableBlock ? (
              <span className="input-error-message-fail-color">
                <Icon as={WarningIcon} /> {data.madeDate}
              </span>
            ) : (
              <span className="input-error-message-success-color">
                <Icon as={CheckIcon} /> {data.madeDate}
              </span>
            )}
          </>
        )}
      </div>
      <Button
        className="submit-button"
        onClick={runFaucet}
        isDisabled={data.isLoadingFaucetableBlock || data.isInvalidAddress}
      >
        {data.isRunning ? (
          <>
            <Spinner className="spinner" />
          </>
        ) : (
          ''
        )}
        Run Faucet
      </Button>
      <div className="status-message">
        {!data.isInvalidAddress && (
          <span>
            {data.isLoadingFaucetableBlock ? (
              <>
                <Icon as={WarningIcon} /> {data.faucetMessage}{' '}
              </>
            ) : (
              ''
            )}
          </span>
        )}
      </div>
    </>
  )
}
