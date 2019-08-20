const axios = require('axios')
const { createBlockchainClient, client } = require('./blockchainClient')

jest.mock('axios', () => {
  const get = jest.fn()
  const create = () => ({ get })

  return { get, create }
})

describe('bitcoinClient', () => {
  describe('creatBlockchainClient()', () => {
    it('has the correct api', () => {
      const actual = createBlockchainClient()
      const expected = {
        getLatestBlockId: expect.any(Function),
        getBlockInfo: expect.any(Function),
        getBlockTransactionsHashes: expect.any(Function),
        getBlockTxInfo: expect.any(Function)
      }

      expect(actual).toEqual(expected)
    })
  })

  describe('client()', () => {
    const blockId = 590947
    const apiBlockInfo = {
      data: {
        data: {
          '590947': {
            block: {
              id: 590947,
              hash: '0000000000000000000f5e0118c4b9aac709c5117bdf246962fb15c503fd87b3',
              date: '2019-08-20',
              time: '2019-08-20 10:56:54',
              median_time: '2019-08-20 10:30:04',
              size: 929979,
              stripped_size: 696529,
              weight: 3019566,
              version: 536870912,
              version_hex: '20000000',
              version_bits: '100000000000000000000000000000',
              merkle_root: '529ac975ee2d2c6b7aa648238869a2e74efe89478dde2cf6735cd2a63ce71db3',
              nonce: 2175909746,
              bits: 387687377,
              difficulty: 10183488432890,
              chainwork: '000000000000000000000000000000000000000007eb31c37075b449b9dfff8c',
              coinbase_data_hex:
                '036304091a2f5669614254432f4d696e65642062792079737435313838382f2cfabe6d6d88cc6d72af2cc6e4871ea47292b38a66dcbaa35427f801a06bd3c5b75b009e29100000000000000010e70ed20772252650853289f3e8595554',
              transaction_count: 2210,
              witness_count: 818,
              input_count: 4076,
              output_count: 5223,
              input_total: 404317210499,
              input_total_usd: 44156600,
              output_total: 405567210499,
              output_total_usd: 44293100,
              fee_total: 23490544,
              fee_total_usd: 2565.47,
              fee_per_kb: 25268.6,
              fee_per_kb_usd: 2.75965,
              fee_per_kwu: 7778.35,
              fee_per_kwu_usd: 0.849494,
              cdd_total: 9699.3344309076,
              generation: 1250000000,
              generation_usd: 136516,
              reward: 1273490544,
              reward_usd: 139081,
              guessed_miner: 'ViaBTC'
            },
            transactions: [
              'eb6bb1cff1b967146ff6ed3d75a0596f18d22040686c7f7b3fb9b8e217e2250e',
              'fd1b3909d384af10d76a06d4bb20c5cf96263472ef85be45164efe00db4ed2db',
              'b44ed2d7b936a931ae0712ee2258e01890eb5f544d2832a2f17195bb5512902b',
              '50891190757360926594b9c0919e2a92bdffdc52efa4036fa791ff9f9654dc5b',
              '7332f3bbb702c418a17d627eae073532a6770c1ce50fe32b3f342590cdb13586',
              '1c12872b81e6ffe042330a39dfcdd6404a99d4bb9dce790cb82857622111454f',
              '45642cfe099a6db88f49d5157a7291b4578f067f040f2821e67b2b17cd8a5c37',
              'fb50abec8553d32c97ed456899b1b9fb1db35183420d932003ef8cfea01e11cc',
              '215f2e9c58381f8b23112d0a057b4e2af78e91da42ef3da37b0aa5d782614f8c',
              'cbb06e52f039cd4b9a663f601a62fa7a743a3c8dabd235436bdf8ba8f41a0a4e',
              '64ceaa15033b8208f878488d42a509c8741490d6b5e1dea42e614449364ff9d9',
              '71e665040538b96441a9c777a4b3eee113991cf979a292826b79483d64c0a0ac',
              '0c96dc5dd23f78e0cc648abaca3ff8a672537036e87263ffedd650d447ceed86',
              '234c429e1d1232196818c104246b14afc6c0db765702551237fec6f729637b5c',
              '30e7d2f04148b5fde22087e17a1bc1804c4d83e2f0c634b8c5952859a662ad6b',
              'b7b77f0c17c680b04277c913a73d922965c90d15795b52a67bc577dd0d00ac0d',
              'bfdacefa5d705c8a3bfbd01ba86d1acc25c7bcaf606630d9ac92367f6c259c37',
              'bb330cf0613366fdca0acdcf1c2ba03d98c9af912c363e9f71e294433f37244f',
              '6cad8a073885cc71fa35e3a93580749f69cbc2d60c58048f77809a608b3b29d0',
              'e4cc6c8031840583f504a616a0e5f99bd053d2b96bbade1ef055f5c3959221d1',
              '69666758e90bb779555f4b90311630c62533b286ca606b808d4e35adebf7fcda',
              '7ca3ce36cdd982688ef9b56d71541b6fcd3a46e8d2ddcac982f3abbce42f6870',
              '65bc396d6a1e004caa84da166cdb3b17efa730aa34f0c9d2f95816059f66d42f',
              '39ccb3615affbfffa9ee0a558d28cf7f9abe6a3b199320bd8c21876b18e5263a',
              '7cf17967fb3177dae88012b4c12597ad603718c109ed6c7b8f1dbdca5e8103bd',
              'db5015c4335a9b6b745c7e46570b595cb5a31ba72caa80ebb5bd83f007c61630',
              '2b630c053c1ad2d20bdb4171c1b7f575024df31ff46b145068a8a9c6ca85ae99',
              '2fb5f61c329b8f26d4d0de26a3b8b1d842dd187adc2063b4a089fcae83c4c48c',
              'f1956bb5b24ff18bc7c0e8be4725ace8e2d0d757a71a20e7cb61b511a8e9b4ad',
              '37734f5a515b7fe71897a1951b182a004c1f09c561ed8c90e91010c86e64385c',
              '9eeb8c1fc4cc5d9d1b9b8200c074226df330d844584d98a1ecac41767fca00a9',
              'aff2a2613462253d036e9a647e90a105cfcb6ed98babaff2e1cbd891887c5144',
              '70bef8539fe5e58df27d077228273ae0f0867921e40e43a015d8da8f7ba8f9f0',
              '5644253f333d9e6aaae5707d62b73c2446bd8da002062c360da7feb6d7835998',
              'd84a26ac1865c863943d58a5ff94b9c0adfe5289953a4a5581537f639453a4cf',
              '07f8598745a29c8cf23e4ae9c96e11c562f2c795ea14b83a85f943b04684b100',
              '7af52171a749fc2df861148aa82d4f6836a65a9439b1059de23c8f7444dbeb0e',
              'da9677db220289dfa8654a46297d90a3a7d3c3ea3935af46a90858ef6596ac77',
              '772ead65d01afb6b129460e3a68ccb6531f27a7a56445f05670eea1a25baec82',
              '393d40504f27b49b03bd1b3dc303db604e5f956f972d7c7f3e4ba65dcbb61824',
              'e499b1a8bf9607074f8047306cade08c75f9f16d32997767b38a46e5c3cbcfbe',
              '967a8642dea2badc7d7bbf0edb9f687c1c1df30467f744a75cabd4c940a52a45',
              'a0e4c1e1f769e561ce10ff9bc6aa614d77390933f254c8852caf018b489b4e10',
              'c799b329069b10c735631c245bd5b7202b9b33d8c9debdfb06533e5c95516a45',
              '6ec44ba62c3f80ed29333e2e732046779470fc3c392d70b53386470b2eae801a',
              '402423f70d5df99ae4ab04dfa605e4af32889893e99ecfca269a9e75ff320844',
              '00960f5974ba6b1dcbe76bdca99b5781800a1dee7b44d432856d7ce83fcce380',
              '9a8f9c244f1632e4a1b8cc4f0919f06d10ed43fd402105a370fc491d2b08faef',
              'eace0ec8df082db7236415743a340bcd534374e9292dcb350aadf5def9666249',
              'aeaa2c4dba26da4d886ee60e051a8550df2a391e11f31eed8440757cbdfe5a6f',
              'fc8c5fc5a1014f3d5531b9c0f1c0da8aa3e839e32a8cb57b0ce15428cbee2ab9',
              'a495930cc825e4f0c84518f08f1e8707c145f9fd6e470ddc43f752dbdd76c0be',
              '1745b18cf47326b1bba0cee3f17b0d77a5ea7078994585acbc430690b0744df4',
              'd523e594e2abcb04a715f9c07ce34b62cf8793aff79b00c2aeb313944e012953',
              '7c0c02a9607a7e4ac432ff1e35488e3767fe966117dd9a16a2360c0927f5ca45',
              'c97639c40b4e204e55fc601a047ac9320e1d590b372a9819dedc0fb929624d0b',
              '8f77023e72ee1d099bb873491fbcbe08dcd3d80ef914260653d0523f3fd4960b',
              'daaade9b02ff827c703e280db96b5582e3776e00fde4384c94aa84973586aa2a',
              '141e048d35003c45c84011c0e6458fd256cf2a590331fb50ece54a3d62a12297',
              '88a5cdf7b66bd90ffa64e5bba9b8f597a7ae5e5f52fce04fdf3d2e3429856eb5',
              '34beecf6ed0dce0f144585db0cabe9466aac4d858da3b22932063402787ba0c1',
              'df8fc9af0fccc477b4611b091e6f584bb73059b3ea7b10f80cb0583c8f41eccf',
              'fe2c5f4e168bd45e14b86116f15423f898597d5e25c6f74ad7e71bd8034ab0dc',
              '2de41af8d6b4b1d7face226e643564e1ee7463f96f3fdae4fbbb7f3303444feb',
              '3d0e752288b625cc43796ed69711e1450ed1c959dd03bde8e3e0bbd26ed2345d',
              '4a0ade578dec53c6d9484d63f82d3bafab74f18e7b7a0b1fefd0c5acaa455bc4',
              '7b5b5f9e12aebffa5bc6bc1881a0902b925f000e765c1a05f712db8132b2c31c',
              '0fe2f8f49c265bcda69769d2a828f43d6a7eadf6e9d0704f249917538b6eb166',
              '077bfe66b33fa6e7d320d6b8151b7f7630f3989f3433887d9b45ce3a41472a74',
              '92c50723d799c7d2f9e8506c4734aedf0b876dfb9e49adc0e4b77f48f566993b',
              'c9cb1ef0d1ae4b3173bb114c0bc8b82061cbf7b981490c8da519320fb47b4c5f',
              'de599a2a0de7842386e623bdc593db4d289dd52c2573b25cff3dc59ccc8c637f',
              '8f04a9f4e2b6c7014e9c0f1a50486d2f5112932147ee839c8772321e05527199',
              '24bb7ff9216a7dd3c3d6488e636e5bacdab8f2f0eed91fa706907f0ba834a271',
              '4881cfb6b0b9ac1258e1385f5e399af96e53760d4380b8d9c0f088c8dbcf0e87',
              '499cacac183bbb8025485467b96d21b3eab789e409e3afd095b4f78e85da8b3f',
              '7435dea8dd194263ac1877f10ee848fe6c0a4ee98469adad014b87efc934b4de',
              '86ca138e9881e27cd4f38670568aeb12e59e7165b0895064a4f43e5973d02d31',
              'e7d027e059d9b5aedfd947bc938cec4651210c16b74e14fba22718d681a49288',
              '9ba89f23574a19be84615326247795ea3f457879170365b0efeac3a0f0ebf091',
              '230840743c9b0361ad541ee21c7bcd857b0a0f6cd140f353d2746816f66f3da8',
              '524fd87ff7f85d237b609e7766cb0ea40390a41b5299d7fe72513b21f975b162',
              '5ebc2079b6c08d0c0f38974e89d6d932a232db5fb423dbbb372e796fb32b09bf',
              'd8a73f667b6e39a8846c762e770cc6f40cbad16fd3bc3c744c70dad157c5c3b6',
              'e39ff33b4c8377bea12989d5db81d142da073a70ba92cb26f254182900e8c73a',
              'b8943c080763a625d592dcd48d838d15ef355cfa6bc380c1afa6e40568b7ae03',
              '08a346cffe6d1f5cb720e065ad3d9d6cf74067eb6d7e91051aa1315d32c01afa',
              'bbcd6e908d9c13b311a65966a3c4c584e6972077520faa19c55524200de119b1',
              'eeba08a6b44c48ca0a10ecdc31ae2365e08ff7ad12033ee791a62173fab90393',
              'd437b4317f4670538d498fc17ea5fef42ae24ab803c1f8b80dc7b96505700951',
              '762c638298bcf63247279745c80bb304bd7a452d2cdb2ec38023fba74e6b6258',
              '0036ab2fee605e390215296636638f5946f6dc1e4392e66a81e2f1f0ef04de8f',
              '103fd9473a1a241263b24699997bfe3450a9367c86a94e84a50b47cf5dddcff4',
              '50d67a422ddd06f6fd44dff8139556c2f6a123c6ef49541c743ecbeea373eb11',
              '8b599d1fb72708eeb08374fc994a37ed844aea0405793d7a27596df61542bc22',
              'a9f1fd276eb719472ea82a89f4fe592bc6fb8e43f87773b8e1cfdf9498a1a5f3',
              '70f01cf325bbdf6802d7275ee4e3f06340e737a4f41d9b149dc0d787eccc0b41',
              'fde00459f89483742b4914fd77a726f9e0badb6fceab2e6fb7ca4b836f8cd596',
              '220fa81983aecdd87807db163d6e3f24a4da84e04ae943ca3dfaa669a5bd50c8',
              'ef3599e54534384a1374053f4db377059ca14d6d5483e6586b54d363e8dcf8e9'
            ]
          }
        }
      }
    }

    describe('#getLatestBlockId', () => {
      it('returns a number', async () => {
        const response = {
          data: {
            data: [
              {
                id: 590947,
                hash: '0000000000000000000f5e0118c4b9aac709c5117bdf246962fb15c503fd87b3',
                date: '2019-08-20',
                time: '2019-08-20 10:56:54',
                median_time: '2019-08-20 10:30:04',
                size: 929979,
                stripped_size: 696529,
                weight: 3019566,
                version: 536870912,
                version_hex: '20000000',
                version_bits: '100000000000000000000000000000',
                merkle_root: '529ac975ee2d2c6b7aa648238869a2e74efe89478dde2cf6735cd2a63ce71db3',
                nonce: 2175909746,
                bits: 387687377,
                difficulty: 10183488432890,
                chainwork: '000000000000000000000000000000000000000007eb31c37075b449b9dfff8c',
                coinbase_data_hex:
                  '036304091a2f5669614254432f4d696e65642062792079737435313838382f2cfabe6d6d88cc6d72af2cc6e4871ea47292b38a66dcbaa35427f801a06bd3c5b75b009e29100000000000000010e70ed20772252650853289f3e8595554',
                transaction_count: 2210,
                witness_count: 818,
                input_count: 4076,
                output_count: 5223,
                input_total: 404317210499,
                input_total_usd: 44156600,
                output_total: 405567210499,
                output_total_usd: 44293100,
                fee_total: 23490544,
                fee_total_usd: 2565.47,
                fee_per_kb: 25268.6,
                fee_per_kb_usd: 2.75965,
                fee_per_kwu: 7778.35,
                fee_per_kwu_usd: 0.849494,
                cdd_total: 9699.3344309076,
                generation: 1250000000,
                generation_usd: 136516,
                reward: 1273490544,
                reward_usd: 139081,
                guessed_miner: 'ViaBTC'
              }
            ]
          }
        }
        axios.get.mockResolvedValueOnce(response)

        const actual = await client.getLatestBlockId()

        expect(actual).toEqual(expect.any(Number))
      })
    })

    describe('#getBlockInfo', async () => {
      it('returns information for a single block', async () => {
        const response = apiBlockInfo
        axios.get.mockResolvedValueOnce(response)

        const actual = await client.getBlockInfo(blockId)
        const expected = {
          transaction_count: expect.any(Number)
        }

        expect(actual).toMatchObject(expected)
      })
    })

    describe('#getBlockTransactionsHashes', () => {
      it('returns all transaction hashes for a single block', async () => {
        const response = apiBlockInfo
        axios.get.mockResolvedValueOnce(response)

        const actual = await client.getBlockTransactionsHashes(blockId)
        const expected = apiBlockInfo.data.data[blockId].transactions

        expect(actual).toEqual(expect.arrayContaining(expected))
      })
    })
  })
})
