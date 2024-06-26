# FeedPage

![FeedPage](/img/build/tutorials/klaystagram-feedpage.png)

FeedPage는 'Klaystagram' 컨트랙트와 상호작용하는 3가지 주요 구성 요소로 이루어져 있습니다.

[`UploadPhoto` 컴포넌트](#2-uploadphoto-component)\
[`Feed` 컴포넌트](#3-feed-component)\
[`TransferOwnership` 컴포넌트](#4-transferownership-component)

```javascript
// src/pages/FeedPage.js

const FeedPage = () => (
  <main className="FeedPage">
    <UploadButton />               // 7-2. UploadPhoto
    <Feed />                       // 7-3. Feed
  </main>
)
```

```javascript
// src/components/Feed.js

<div className="Feed">
  {feed.length !== 0
    ? feed.map((photo) => {
      // ...
      return (
        <div className="FeedPhoto" key={id}>

            // ...
            {
              userAddress.toUpperCase() === currentOwner.toUpperCase() && (
                <TransferOwnershipButton   // 7-4. TransferOwnership
                  className="FeedPhoto__transferOwnership"
                  id={id}
                  issueDate={issueDate}
                  currentOwner={currentOwner}
                />
              )
            }
            // ...
        </div>
      )
    })
    : <span className="Feed__empty">No Photo :D</span>
  }
</div>
)
```

컴포넌트가 컨트랙트와 상호작용하도록 만들려면 3단계가 있습니다.

**두번째**, `KlaystagramContract` 인스턴스를 사용하여 `redux/actions`에서 컨트랙트와 상호작용하는 API 함수를 만듭니다.\\

빌드해 봅시다!

## 1. 프런트엔드에 컨트랙트 연결하기 <a id="7-1-connect-contract-to-frontend"></a>

1. `src/klaytn`
   - caver.js
   - KlaystagramContract.js
2. `src/redux`

### 1) `src/klaytn` <a id="1-src-klaytn"></a>

`src/klaytn`: 카이아 블록체인과 상호작용하는 데 도움이 되는 파일들을 포함합니다.

- `src/klaytn/caver.js`: 설정된 설정 내에서 caver를 인스턴스화합니다.

  cf) caver-js는 카이아 노드에 연결하여 카이아에 배포된 노드 또는 스마트 컨트랙트와 상호작용하는 RPC 라이브러리입니다.

- `src/klaytn/Klaystagram.js`: caver-js API를 사용하여 컨트랙트 인스턴스를 생성합니다. 인스턴스를 통해 컨트랙트와 상호작용할 수 있습니다.

#### `caver.js` <a id="caver-js"></a>

```javascript
/**
 * caver-js library helps making connection with klaytn node.
 * You can connect to specific klaytn node by setting 'rpcURL' value.
 * default rpcURL is 'https://public-en-baobab.klaytn.net'.
 */
import Caver from 'caver-js'

export const config = {
  rpcURL: 'https://public-en-baobab.klaytn.net'
}

export const cav = new Caver(config.rpcURL)

export default cav
```

연결이 완료되면 caver로 스마트 컨트랙트에서 메서드를 호출할 수 있습니다.

#### `KlaystagramContract.js` <a id="klaystagramcontract-js"></a>

```javascript
// klaytn/KlaystagramContract.js

import { cav } from 'klaytn/caver'

/**
 * 1. Create contract instance
 * ex:) new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
 * You can call contract method through this instance.
 */

const KlaystagramContract = DEPLOYED_ABI
  && DEPLOYED_ADDRESS
  && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)

export default KlaystagramContract
```

컨트랙트와 상호작용하려면 컨트랙트 인스턴스가 필요합니다.

`KlaystagramContract` creates a contract instance to interact with Klaystagram contract, by providing `DEPLOYED_ABI`\(Application Binary Interface\) and `DEPLOYED_ADDRESS` to `cav.klay.Contract` API.

`Klaystagram.sol` 컨트랙트를 컴파일하고 배포할 때 ([5. 배포 컨트랙트](./deploy-contracts.md#3.-deploy-contract)) 이미 `deployedABI`와 `deployedAddress` 파일을 생성했습니다. 이 파일에는 Klaystagram 컨트랙트의 ABI와 배포된 컨트랙트 주소가 들어 있습니다.

그리고 웹팩의 설정 덕분에 변수(`DEPLOYED_ADDRESS`, `DEPLOYED_ABI`)로 액세스할 수 있습니다.

- `DEPLOYED_ADDRESS`는 배포된 주소를 반환합니다.
- `DEPLOYED_ABI`는 Klaystagram contract ABI를 반환합니다.

**참고) `contract ABI`(애플리케이션 바이너리 인터페이스)**\
`contract ABI`는 컨트랙트 메서드를 호출하기 위한 인터페이스입니다. 이 인터페이스를 사용하면 다음과 같이 컨트랙트 메서드를 호출할 수 있습니다.

- `contractInstance.methods.methodName().call()`
- `contractInstance.methods.methodName().send({ ... })`

**Now we are ready to interact with contract in the application.**\
_cf. **이제 애플리케이션에서 컨트랙트와 상호작용할 준비가 되었습니다.**\
참고) _자세한 내용은 [_caver.klay.Contract_](../../../references/sdk/caver-js-1.4.1/api/caver.klay.Contract.md)를 참조하세요._

### 2. `src/redux` <a id="7-1-connect-contract-to-frontend"></a>

Klaystagram 인스턴스로 API 함수를 만들어 보겠습니다. API 함수를 호출한 후, 리덕스 스토어를 사용하여 모든 데이터 흐름을 제어합니다.

1. 컨트랙트 인스턴스 가져오기

   `KlaystagramContract` 인스턴스를 사용하면 컴포넌트가 컨트랙트와 상호작용해야 할 때 컨트랙트의 메서드를 호출할 수 있습니다.

2. 컨트랙트 메서드 호출하기

3. Store data from contract

   트랜잭션이 성공하면 리덕스 작업을 호출하여 컨트랙트에서 리덕스 스토어에 정보를 저장합니다.

```javascript
// src/redux/actions/photos.js

// 1. Import contract instance
import KlaystagramContract from 'klaytn/KlaystagramContract'

const setFeed = (feed) => ({
  type: SET_FEED,
  payload: { feed },
})

const updateFeed = (tokenId) => (dispatch, getState) => {

  // 2. Call contract method (CALL): getPhoto()
  KlaystagramContract.methods.getPhoto(tokenId).call()
    .then((newPhoto) => {
      const { photos: { feed } } = getState()
      const newFeed = [feedParser(newPhoto), ...feed]

      // 3. Store data from contract
      dispatch(setFeed(newFeed))
    })
}
```

Redux 스토어는 프론트엔드에서 모든 데이터 흐름을 제어합니다.

## 2. UploadPhoto 컴포넌트 <a id="1-src-klaytn"></a>

![사진 업로드](/img/build/tutorials/klaystagram-uploadphoto.png)

1. `UploadPhoto` 컴포넌트의 역할
2. 컴포넌트 코드.
3. Interact with contract
4. 저장할 데이터를 업데이트합니다: `updateFeed` 함수

### 1) `UploadPhoto` 컴포넌트의 역할 <a id="caver-js"></a>

`UploadPhoto` 컴포넌트는 카이아 블록체인에 사진 업로드 요청을 처리합니다. 그 과정은 다음과 같습니다:

1. 트랜잭션을 전송하여 스마트 컨트랙트의 `uploadPhoto` 메서드를 호출합니다. `UploadPhoto` 컨트랙트 메서드 내에서 새로운 ERC-721 토큰이 발행됩니다.
2. 트랜잭션 전송 후, 트랜잭션 라이프사이클에 따른 진행 상황을 `Toast` 컴포넌트를 사용하여 표시합니다.
3. 트랜잭션이 블록에 들어가면 로컬 리덕스 저장소에 새로운 `PhotoData`를 업데이트합니다.

단일 트랜잭션의 최대 크기는 `32KB`입니다. 따라서 안전하게 전송하기 위해 입력 데이터(사진 및 설명)가 `30KB`를 초과하지 않도록 제한합니다.

- 문자열 데이터 크기는 `2KB`로 제한됩니다.
- [`imageCompression()`](https://github.com/klaytn/klaystagram/blob/main/src/utils/imageCompression.js) 함수를 사용하여 사진을 `28KB` 미만으로 압축합니다.

### 컴포넌트 코드 <a href="#2-component-code" id="2-component-code"></a>

```javascript
// src/components/UploadPhoto.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import imageCompression from 'utils/imageCompression';
import ui from 'utils/ui'
import Input from 'components/Input'
import InputFile from 'components/InputFile'
import Textarea from 'components/Textarea'
import Button from 'components/Button'

import * as photoActions from 'redux/actions/photos'

import './UploadPhoto.scss'

// Set a limit of contents
const MAX_IMAGE_SIZE = 30 * 1024 // 30KB
const MAX_IMAGE_SIZE_MB = 30 / 1024 // 30KB

class UploadPhoto extends Component {
  state = {
    file: '',
    fileName: '',
    location: '',
    caption: '',
    warningMessage: '',
    isCompressing: false,
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]

    /**
     * If image size is bigger than MAX_IMAGE_SIZE(30KB),
     * Compress the image to load it on transaction
     * cf. Maximum transaction input data size: 32KB
     */
    if (file.size > MAX_IMAGE_SIZE) {
      this.setState({
        isCompressing: true,
      })
      return this.compressImage(file)
    }

    return this.setState({
      file,
      fileName: file.name,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { file, fileName, location, caption } = this.state
    this.props.uploadPhoto(file, fileName, location, caption)
    ui.hideModal()
  }

  compressImage = async (imageFile) => {
    try {
      const compressedFile = await imageCompression(imageFile, MAX_IMAGE_SIZE_MB)
      this.setState({
        isCompressing: false,
        file: compressedFile,
        fileName: compressedFile.name,
      })
    } catch (error) {
      this.setState({
        isCompressing: false,
        warningMessage: '* Fail to compress image'
      })
    }
  }

  render() {
    const { fileName, location, caption, isCompressing, warningMessage } = this.state
    return (
      <form className="UploadPhoto" onSubmit={this.handleSubmit}>
        <InputFile
          className="UploadPhoto__file"
          name="file"
          label="Search file"
          fileName={isCompressing ? 'Compressing image...' : fileName}
          onChange={this.handleFileChange}
          err={warningMessage}
          accept=".png, .jpg, .jpeg"
          required
        />
        <Input
          className="UploadPhoto__location"
          name="location"
          label="Location"
          value={location}
          onChange={this.handleInputChange}
          placeholder="Where did you take this photo?"
          required
        />
        <Textarea
          className="UploadPhoto__caption"
          name="caption"
          value={caption}
          label="Caption"
          onChange={this.handleInputChange}
          placeholder="Upload your memories"
          required
        />
        <Button
          className="UploadPhoto__upload"
          type="submit"
          title="Upload"
        />
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  uploadPhoto: (file, fileName, location, caption) =>
    dispatch(photoActions.uploadPhoto(file, fileName, location, caption)),
})

export default connect(null, mapDispatchToProps)(UploadPhoto)
```

### 컨트랙트와 상호작용하기 <a href="#3-interact-with-contract" id="3-interact-with-contract"></a>

카이아에 사진 데이터를 쓰는 함수를 만들어 봅시다. 읽기 전용 함수 호출과 달리 데이터를 쓰면 트랜잭션 수수료가 발생합니다. 트랜잭션 수수료는 사용한 `gas`의 양에 따라 결정됩니다. `gas`는 트랜잭션을 처리하는 데 얼마나 많은 계산이 필요한지를 나타내는 측정 단위입니다.

이러한 이유로 트랜잭션을 전송하기 위해서는 두 개의 속성 `from`와 `gas`가 필요합니다.

1. 트랜잭션에 로드할 사진 파일을 바이트 문자열로 변환합니다.

   ([Klaystagram 컨트랙트](./deploy-contracts.md#4-write-klaystagram-smart-contract)에서는 `PhotoData` 구조체에서 사진 fotmat을 바이트열로 정의했습니다.)

   - `FileReader`를 사용하여 사진 데이터를 ArrayBuffer로 읽기
   - ArrayBuffer를 16진수 문자열로 변환합니다.
   - 바이트 형식을 만족시키기 위해 접두사 `0x`를 추가합니다.
2. 컨트랙트 메서드 호출: `uploadPhoto`
   - `from`: 트랜잭션을 전송하고 트랜잭션 수수료를 지불할 계정입니다.
   - `gas`: \\`from' 계정이 이 트랜잭션에 대해 지불하고자 하는 최대 가스 금액입니다.
3. 트랜잭션 전송 후, 트랜잭션 라이프사이클에 따른 진행 상황을 `Toast` 컴포넌트를 사용하여 표시합니다.
4. 트랜잭션이 블록에 성공적으로 들어가면 `updateFeed` 함수를 호출하여 피드 페이지에 새 사진을 추가합니다.

```javascript
// src/redux/actions/photo.js

export const uploadPhoto = (
  file,
  fileName,
  location,
  caption
) => (dispatch) => {
  // 1. Convert photo file as a hex string to load on transaction
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    const buffer = Buffer.from(reader.result)

    // Add prefix `0x` to hexString to recognize hexString as bytes by contract
    const hexString = "0x" + buffer.toString('hex')

    // 2. Invoke the contract method: uploadPhoto
    // Send transaction with photo file(hexString) and descriptions
    try{
      KlaystagramContract.methods.uploadPhoto(hexString, fileName, location, caption).send({
        from: getWallet().address,
        gas: '200000000',
      }, (error, txHash) => {
        if (error) throw error;

        // 3. After sending the transaction,
        // show progress along the transaction lifecycle using `Toast` component.
        ui.showToast({
          status: 'pending',
          message: `Sending a transaction... (uploadPhoto)`,
          txHash,
        })
      })
        .then((receipt) => {
          ui.showToast({
            status: receipt.status ? 'success' : 'fail',
            message: `Received receipt! It means your transaction is
            in klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
            link: receipt.transactionHash,
          })

          // 4. If the transaction successfully gets into a block,
          // call `updateFeed` function to add the new photo into the feed page.
          if(receipt.status) {
            const tokenId = receipt.events.PhotoUploaded.returnValues[0]
            dispatch(updateFeed(tokenId))
          }
        })
    } catch (error) {
      ui.showToast({
        status: 'error',
        message: error.toString(),
      })
    }
  }
}
```

**참고) 트랜잭션 라이프사이클**

트랜잭션을 전송한 후 트랜잭션 라이프사이클(`transactionHash`, `receipt`, `error`)을 얻을 수 있습니다.

- 서명된 트랜잭션 인스턴스가 제대로 구성되면 `transactionHash` 이벤트가 발생합니다. 네트워크를 통해 트랜잭션을 전송하기 전에 트랜잭션 해시를 얻을 수 있습니다.
- 트랜잭션 영수증을 받으면 `receipt` 이벤트가 발생합니다. 트랜잭션이 블록에 포함되었다는 의미입니다. 블록 번호는 `receipt.blockNumber`로 확인할 수 있습니다.
- 문제가 발생하면 `error` 이벤트가 발생합니다.

### 4. 피드 페이지에서 사진 업데이트: `updateFeed` <a href="#4-update-photo-in-the-feed-page-updatefeed" id="4-update-photo-in-the-feed-page-updatefeed"></a>

트랜잭션을 컨트랙트에 성공적으로 전송한 후 FeedPage를 업데이트해야 합니다. `tokenId`로 `getPhoto()`를 호출해 보겠습니다. `tokenId`는 트랜잭션 영수증에서 검색할 수 있습니다. 그런 다음 로컬 리덕스 저장소에 새 사진 데이터를 추가합니다.

```javascript
// src/redux/actions/photo.js

/**
 * 1. Call contract method: getPhoto()
 * To get new photo data we've just uploaded,
 * call `getPhoto()` with tokenId from receipt after sending transaction
*/
const updateFeed = (tokenId) => (dispatch, getState) => {
  KlaystagramContract.methods.getPhoto(tokenId).call()
    .then((newPhoto) => {
      const { photos: { feed } } = getState()
      const newFeed = [feedParser(newPhoto), ...feed]

      // 2. update new feed to store
      dispatch(setFeed(newFeed))
    })
}
```

## 3. Feed 컴포넌트 <a href="#3.-feed-component" id="3.-feed-component"></a>

![klaystagram-feed](/img/build/tutorials/klaystagram-feed.png)

1. `Feed` 컴포넌트의 역할
2. 컨트랙트에서 데이터 읽기: `getFeed` 메서드
3. 저장할 데이터 저장: `setFeed` 액션
4. 컴포넌트에 데이터 표시: `Feed` 컴포넌트

### 1) `Feed` 컴포넌트의 역할 <a href="#1-feed-component-s-role" id="1-feed-component-s-role"></a>

[4. Klaystagram 스마트 컨트랙트 작성하기](./deploy-contracts.md#4-write-klaystagram-smart-contract)에서 `PhotoData` 구조체를 작성하여 `_photoList` 매핑 안에 위치시켰습니다. 피드 컴포넌트의 역할은 다음과 같습니다:

1. 클레이스타그램 컨트랙트 메서드 호출을 통해 `PhotoData`를 읽습니다(`redux/actions/photos.js`)
2. 소유자 정보와 함께 `PhotoData`(피드)를 표시합니다(`components/Feed.js`).

### 2) 컨트랙트에서 데이터 읽기: `getPhoto` 메서드 <a href="#2-read-data-from-contract-getphoto-method" id="2-read-data-from-contract-getphoto-method"></a>

1. 컨트랙트 메서드 호출: `getTotalPhotoCount()`

   사진이 0장이면 빈 배열로 `setFeed` 액션을 호출합니다.
2. 컨트랙트 메서드 호출: `getPhoto(id)`

   사진이 있으면 각 사진 데이터를 프로미스로 가져와서 피드 배열에 푸시합니다. 모든 프로미스가 해결되면 피드 배열을 반환합니다.
3. 리덕스 액션 호출: `setFeed(feed)`

   해결된 피드 배열을 가져와 리덕스 저장소에 저장합니다.

```javascript
// src/redux/actions/photos.js

const setFeed = (feed) => ({
  type: SET_FEED,
  payload: { feed },
})

export const getFeed = () => (dispatch) => {
  // 1. Call contract method(READ): `getTotalPhotoCount()`
  // If there is no photo data, call `setFeed` action with empty array
  KlaystagramContract.methods.getTotalPhotoCount().call()
    .then((totalPhotoCount) => {
      if (!totalPhotoCount) return []
      const feed = []
      for (let i = totalPhotoCount; i > 0; i--) {
        // 2. Call contract method(READ):`getPhoto(id)`
        // If there is photo data, call all of them
        const photo = KlaystagramContract.methods.getPhoto(i).call()
        feed.push(photo)
      }
      return Promise.all(feed)
    })
    .then((feed) => {
      // 3. Call actions: `setFeed(feed)`
      // Save photo data(feed) to store
      dispatch(setFeed(feedParser(feed))
    })
}
```

### 저장할 데이터 저장: `setFeed` 액션 <a href="#3-save-data-to-store-setfeed-action" id="3-save-data-to-store-setfeed-action"></a>

Klaystagram 컨트랙트에서 사진 데이터(피드)를 성공적으로 가져온 후 `setFeed(feed)` 액션을 호출합니다. 이 액션은 사진 데이터를 페이로드로 가져와서 리덕스 저장소에 저장합니다.

### 컴포넌트에 데이터 표시: `Feed` 컴포넌트 <a href="#4-show-data-in-component-feed-component" id="4-show-data-in-component-feed-component"></a>

```javascript
// src/components/Feed.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Loading from 'components/Loading'
import PhotoHeader from 'components/PhotoHeader'
import PhotoInfo from 'components/PhotoInfo'
import CopyrightInfo from 'components/CopyrightInfo'
import TransferOwnershipButton from 'components/TransferOwnershipButton'
import { drawImageFromBytes} from 'utils/imageUtils'
import { last } from 'utils/misc'

import * as photoActions from 'redux/actions/photos'

import './Feed.scss'

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: !props.feed,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedFeed = (nextProps.feed !== prevState.feed) && (nextProps.feed !== null)
    if (isUpdatedFeed) {
      return { isLoading: false }
    }
    return null
  }

  componentDidMount() {
    const { feed, getFeed } = this.props
    if (!feed) getFeed()
  }

  render() {
    const { feed, userAddress } = this.props

    if (this.state.isLoading) return <Loading />

    return (
      <div className="Feed">
        {feed.length !== 0
          ? feed.map(({
            id,
            ownerHistory,
            data,
            name,
            location,
            caption,
            timestamp,
          }) => {
            const originalOwner = ownerHistory[0]
            const currentOwner = last(ownerHistory)
            const imageUrl = drawImageFromBytes(data)
            const issueDate = moment(timestamp * 1000).fromNow()
            return (
              <div className="FeedPhoto" key={id}>
                <PhotoHeader
                  currentOwner={currentOwner}
                  location={location}
                />
                <div className="FeedPhoto__image">
                  <img src={imageUrl} alt={name} />
                </div>
                <div className="FeedPhoto__info">
                  <PhotoInfo
                    name={name}
                    issueDate={issueDate}
                    caption={caption}
                  />
                  <CopyrightInfo
                    className="FeedPhoto__copyrightInfo"
                    id={id}
                    issueDate={issueDate}
                    originalOwner={originalOwner}
                    currentOwner={currentOwner}
                  />
                  {
                    userAddress.toUpperCase() === currentOwner.toUpperCase() && (
                      <TransferOwnershipButton
                        className="FeedPhoto__transferOwnership"
                        id={id}
                        issueDate={issueDate}
                        currentOwner={currentOwner}
                      />
                    )
                  }
                </div>
              </div>
            )
          })
          : <span className="Feed__empty">No Photo :D</span>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  feed: state.photos.feed,
  userAddress: state.auth.address,
})

const mapDispatchToProps = (dispatch) => ({
  getFeed: () => dispatch(photoActions.getFeed()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
```

처음엔 아직 컨트랙트에 사진 데이터가 없기 때문에 "사진 없음 :D"라는 텍스트만 보입니다.

## 4. TransferOwnership 컴포넌트 <a href="#4.-transferownership-component" id="4.-transferownership-component"></a>

![소유권 이전](/img/build/tutorials/klaystagram-transferownership.png)

1. `TransferOwnership` 컴포넌트의 역할
2. 컴포넌트 코드

   2-1. `TransferOwnership` 버튼 렌더링하기

   2-2. `TransferOwnership` 컴포넌트
3. 컨트랙트와 상호작용: `transferOwnership` 메서드
4. 저장할 데이터를 업데이트합니다: `updateOwnerAddress` 액션

### 1) `TransferOwnership` 컴포넌트의 역할 <a href="#1-transferownership-component-s-role" id="1-transferownership-component-s-role"></a>

사진 소유자는 사진의 소유권을 다른 사용자에게 양도할 수 있습니다. 트랜스퍼오너십\\` 트랜잭션을 전송하면 새로운 소유자의 주소가 소유권 기록에 저장되어 과거 소유자 주소를 추적할 수 있습니다.

### 컴포넌트 코드 <a id="klaystagramcontract-js"></a>

#### 2-1) `TransferOwnership` 버튼 렌더링 <a href="#2-1-rendering-transferownership-button" id="2-1-rendering-transferownership-button"></a>

사진의 소유자 주소가 로그인한 사용자의 주소와 일치하는 경우(즉, 사용자가 소유자라는 의미)에만 `FeedPhoto` 컴포넌트에 `TransferOwnership` 버튼을 렌더링하겠습니다.

```javascript
// src/components/Feed.js

<div className="FeedPhoto">
  // ...
  {
    userAddress.toUpperCase() === currentOwner.toUpperCase() && (
      <TransferOwnershipButton
        className="FeedPhoto__transferOwnership"
        id={id}
        issueDate={issueDate}
        currentOwner={currentOwner}
      />
    )
  }
  // ...
</div>
```

#### 2-2) `TransferOwnership` 컴포넌트 <a href="#2-2-transferownership-component" id="2-2-transferownership-component"></a>

```javascript
// src/components/TransferOwnership.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as photoActions from 'redux/actions/photos'
import ui from 'utils/ui'
import { isValidAddress } from 'utils/crypto'
import Input from 'components/Input'
import Button from 'components/Button'

import './TransferOwnership.scss'

class TransferOwnership extends Component {
  state = {
    to: null,
    warningMessage: '',
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { id, transferOwnership } = this.props
    const { to } = this.state

    if (!isValidAddress(to)) {
      return this.setState({
        warningMessage: '* Invalid wallet address',
      })
    }
    transferOwnership(id, to)
    ui.hideModal()
  }

  render() {
    const { id, issueDate, currentOwner } = this.props
    return (
      <div className="TransferOwnership">
        <h3 className="TransferOwnership__copyright">Copyright. {id}</h3>
        <p className="TransferOwnership__issueDate">Issue Date  {issueDate}</p>
        <form className="TransferOwnership__form" onSubmit={this.handleSubmit}>
          <Input
            className="TransferOwnership__from"
            name="from"
            label="Current Owner"
            value={currentOwner}
            readOnly
          />
          <Input
            className="TransferOwnership__to"
            name="to"
            label="New Owner"
            onChange={this.handleInputChange}
            placeholder="Transfer Ownership to..."
            err={this.state.warningMessage}
            required
          />
          <Button
            type="submit"
            title="Transfer Ownership"
          />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  transferOwnership: (id, to) => dispatch(photoActions.transferOwnership(id, to)),
})

export default connect(null, mapDispatchToProps)(TransferOwnership)
```

### 컨트랙트와 상호작용하기: `transferOwnership` 메서드 <a href="#3-interact-with-contract-transferownership-method" id="3-interact-with-contract-transferownership-method"></a>

**첫번째**, 컨트랙트와 프론트엔드를 연결하기 위해 `KlaystagramContract` 인스턴스를 생성합니다.\\ Klaystagram 스마트 컨트랙트 작성하기](./deploy-contracts.md#4-write-klaystagram-smart-contract)에서 Klaystagram 컨트랙트에 `transferOwnership` 함수를 만들었습니다. 애플리케이션에서 호출해 봅시다.

1. 컨트랙트 메서드 호출: `transferOwnership`
   - `id:` 사진의 토큰아이디
   - `to:` 사진의 소유권을 이전할 주소
2. 트랜잭션 옵션 설정
   - `from`: 이 트랜잭션을 전송하고 트랜잭션 수수료를 지불하는 계정입니다.
   - `gas`: 발신자\\` 계정이 이 트랜잭션에 대해 지불할 수 있는 최대 가스 금액입니다.
3. 트랜잭션 전송 후, 트랜잭션 라이프사이클에 따른 진행 상황을 `Toast` 컴포넌트를 사용하여 표시합니다.
4. 트랜잭션이 블록에 성공적으로 들어가면 `updateOwnerAddress` 함수를 호출하여 새로운 소유자의 주소를 피드 페이지에 업데이트합니다.

```javascript
// src/redux/actions/photo.js

export const transferOwnership = (tokenId, to) => (dispatch) => {
  // 1. Invoke the contract method: transferOwnership
  try{
    KlaystagramContract.methods.transferOwnership(tokenId, to).send({
      
      // 2. Set transaction options
      from: getWallet().address,
      gas: '20000000',
    }, (error, txHash) => {
      if (error) throw error;

      // 3. After sending the transaction,
      // show progress along the transaction lifecycle using `Toast` component.
      ui.showToast({
        status: 'pending',
        message: `Sending a transaction... (transferOwnership)`,
        txHash,
      })
    })
      .then((receipt) => {
        ui.showToast({
          status: receipt.status ? 'success' : 'fail',
          message: `Received receipt! It means your transaction is
            in klaytn block (#${receipt.blockNumber}) (transferOwnership)`,
          link: receipt.transactionHash,
        })

        // 4. If the transaction successfully gets into a block,
        // call `updateOwnerAddress` function to update new owner's address into the feed page.
        dispatch(updateOwnerAddress(tokenId, to))
      })
  } catch (error) {
    ui.showToast({
      status: 'error',
      message: error.toString(),
    })
  }
}
```

### 리덕스 스토어에서 정보 업데이트: `updateOwnerAddress` 액션 <a href="#4-update-information-in-redux-store-updateowneraddress-action" id="4-update-information-in-redux-store-updateowneraddress-action"></a>

새 소유자의 주소를 업데이트하려면 스토어에서 `feed` 데이터를 호출하여 영수증에서 토큰아이디가 있는 사진을 찾습니다. 그런 다음 새 소유자의 주소를 사진의 `ownerHistory`에 푸시하고 setFeed를 호출합니다.

```javascript
const updateOwnerAddress = (tokenId, to) => (dispatch, getState) => {
  const { photos: { feed } } = getState()
  const newFeed = feed.map((photo) => {
    if (photo['id'] !== tokenId) return photo
    photo['ownerHistory'] = [...photo['ownerHistory'], to]
    return photo
  })
  dispatch(setFeed(newFeed))
}
```
