export default {
  preamble: {
    title: "kora/handle-mint",
    description: "Aiken contracts for project 'kora/handle-mint'",
    version: "0.0.0",
    plutusVersion: "v2",
    compiler: {
      name: "Aiken",
      version: "v1.0.29-alpha+16fb02e",
    },
    license: "Apache-2.0",
  },
  validators: [
    {
      title: "mint_proxy.mint",
      redeemer: {
        title: "_r",
        schema: {
          $ref: "#/definitions/Data",
        },
      },
      parameters: [
        {
          title: "version",
          schema: {
            $ref: "#/definitions/Int",
          },
        },
      ],
      compiledCode:
        "5902e8010000323232323232322322253330053232533233008300130093754601a601c0062646464646464a66601ca66601c66e25200000c13370e018002294054ccc038c8c8cc00400401c894ccc050004528099299980919baf0043013301700214a2266006006002602e00260086602466e95200233012375200497ae04bd700a511616375a602460260046eb8c044004c034dd519192999806980318071baa001132533300e3370e900218079baa00113232002533300f3008301037540022646464646464a66603060360042930b180c800980c8011bad30170013017002375c602a00260226ea800458c04cc040dd50008b18091809980998079baa3002300f37546024601e6ea800458c8cc004004dd618090029129998088008a60103d87a80001323253330103230013253330123002301337540022900009bad30173014375400264a666024600460266ea80045300103d87a80001323300100137566030602a6ea8008894ccc05c004530103d87a800013232323253330183372291118000de14064656d694068616e646c655f73657474696e677300002153330183371e910118000de14064656d694068616e646c655f73657474696e6773000021300e3301c375000297ae014c0103d87a8000133006006003375a60320066eb8c05c008c06c008c064004c8cc004004dd59803980a1baa30073014375400844a66602c002298103d87a80001323232325333017337229111cf0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a00002153330173371e91011cf0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a000021300d3301b374c00297ae014c0103d87a8000133006006003375660300066eb8c058008c068008c060004dc3a40042600c6602800497ae013300400400130150023013001230113012001374a90001bab300e300f300f300f300f300f001300e300a37540046e1d200016300b0013007375400229309b2b1bad0015734aae7555cf2ab9f5740ae855d101",
      hash: "02333b543ae8e19833fb55ce7813b381c731278197bb5f4b8bd51e91",
    },
    {
      title: "mint_v1.withdraw",
      redeemer: {
        title: "redeemer",
        schema: {
          $ref: "#/definitions/mint_v1~1MintV1Redeemer",
        },
      },
      compiledCode:
        "590aa20100003232323232323223232322533300632325332330093001300a3754601c601e0062a666012600e60146ea80204c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c94ccc0bccdd7980d18189baa301a30313754606864a666060605c60626ea80044c8c94ccc0c8c0a8c0ccdd5000899191981c1810981b1baa004330380024bd7029998199818981a1baa001132325333038303b002149858dd7181c800981a9baa001163037303437540022c604660666ea8c078c0ccdd5000981a98191baa001163301f0172302d33301c3756603a60646ea8c074c0c8dd5000a451cf0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a00488120000de14068616e646c65735f726f6f744068616e646c655f73657474696e6773003374a900119819981a181a80125eb8054ccc0bcc8cc004004030894ccc0d0004528099299981919191980080080b11299981c0008a5013253330363371e6eb8c0ec008010528899801801800981d8009bae303700214a2266006006002606e00226464646464666666002002038607400690002400097adef6c6022222253233303d0061533303a3375e604a60786ea802805054ccc0e8cdd79816181e1baa00a4c107d87b9fd87980ff001533303a3371200860486eacc09cc0f0dd50050a99981d18009814981e1baa00a1533303a3375e605860786ea802130107d87b9fd87980ff001533303a3371200660486eacc09cc0f0dd50040a99981d18009814981e1baa0081533303a3375e6e98cc0b4075220100374c004294458585858585858584c8c8c8c8c8c94ccc100c0f4c104dd50010a99982019b8f375c608a60846ea800804854ccc100c0e0c104dd500189919191919191919191919299982599baf3036304d375400c03e2a66609666ebcdd31981f1bab3038304d375400c91100374c666607297adef6c600290024800854ccc12cc048c0e8c134dd50030a99982599baf3036304d3754008606c609a6ea801c54ccc12ccdd7981c18269baa004374c666607266660726eacc0e0c134dd5181c18269baa01148810048810033702900019b80023021029001480084cccccc06006004000ccdc000a81199b8001402133330393333039013029001480080a40092002161616161633714910104000de1400000733714910104000643b000006304e002304c001304c011304a0103049304a002375c6090002609060886ea80094ccc104c0fcc108dd500089919191919192999825182680109924ca66608e608a60906ea80044c8c94ccc130c13c0084c926303d00116304d001304937540022c2c609600260960046eb8c124004c124008c11c004c10cdd50008b182298211baa00316001001133333300c00c00400a0090080073043304037546086004608460866086002607c6ea8c0a4c0f8dd50011820803981f8031baf4c103d87a800030370013037002303500130350141616375c60660026066004606200260620046eb4c0bc004c0bc008dd698168009816801181580098158011bac30290013029002375c604e00260466ea80094ccc080c078c084dd50008991919191919191919191919191919192999819981b001099191924c604c00e604a018646600200201c44a66606a00229309919801801981c8011bae303700116375c606800260680046eb8c0c8004c0c8008c0c0004c0c0008dd6981700098170011bad302c001302c002302a001302a0023758605000260500046eb8c098004c088dd50008b18121812981298109baa325333020301e30213754002264a666042603260446ea80044c8c80094ccc088c080c08cdd50008991919191919299981598170010a4c2c605800260580046eb4c0a8004c0a8008dd7181400098121baa001163026302337540022c602460446ea8c034c088dd5181298111baa001163300f3758604800c4603a6660186eacc034c088dd5180698111baa00148811cf0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a00488118000de14064656d694068616e646c655f73657474696e6773003758604660486048604860480046eacc088004c088c088008dd618100009810000980f8011bac301d001301937540204666006002911004881002301b0012223253330183015301937540022900009bad301d301a375400264a666030602a60326ea8004530103d87a8000132330010013756603c60366ea8008894ccc074004530103d87a8000132323232533301e337220100042a66603c66e3c0200084c03ccc088dd4000a5eb80530103d87a8000133006006003375a603e0066eb8c074008c084008c07c004c8cc004004010894ccc0700045300103d87a8000132323232533301d337220100042a66603a66e3c0200084c038cc084dd3000a5eb80530103d87a80001330060060033756603c0066eb8c070008c080008c0780048c064c06800488894ccc058c05000440104c8c8cc004004018894ccc0700044cc074cdd81ba9006374c00697adef6c60132323232533301d3372001400426604266ec0dd48051ba60070051533301d3371e014004264a66603c6038603e6ea80044cc088cdd81ba900b302330203754002008200864a66603ca66604200229445280a60103d87a80001300f33022374c00297ae03233001001002225333022001133023337606ea402cdd400525eb7bdb1804c8c8c8c94ccc08ccdc800780109981399bb0375201e6ea003801454ccc08ccdc78078010992999812181118129baa001133028337606ea4040c0a4c098dd5000802080219299981218110008a6103d87a80001301533028375000297ae03370000201c26604e66ec0dd48011ba800133006006003375a60480066eb8c088008c098008c0900044cc084cdd81ba9002374c0026600c00c0066eacc07800cdd7180e0011810001180f000991900118060009980d19bb037520046ea00052f5bded8c04602e60306030603000244646600200200644a66602e0022980103d87a80001323253330163005002130073301a0024bd70099802002000980d801180c8009ba5480008c050c054c05400488c8cc00400400c894ccc05000452f5bded8c0264646464a66602a66e4401c00854ccc054cdc78038010801880289980c99bb037520046e98004cc01801800cdd5980b0019bae3014002301800230160012533300d300b300e3754002264646464a666028602e0042646493192999809980880089919299980c180d80109924c64a66602c602800226464a666036603c0042649318078008b180e000980c1baa0021533301630130011323232323232533301f3022002149858dd6981000098100011bad301e001301e002375a603800260306ea800858c058dd50008b180c800980a9baa00315333013301000115333016301537540062930b0b18099baa002300800316301500130150023013001300f37540022c600200244a66601e00229309929998080008a4c26464a66601e66e40dd71808180a0021bae30100021330050053301300200116301400230120013012001232533300b30090011323253330103013002149858dd7180880098069baa0021533300b30080011323253330103013002149858dd7180880098069baa00216300b37540022940dc3a40082c601800260106ea800452613656325333005300300115333008300737540082930b0a99980298010008a99980418039baa00414985858c014dd50019b8748008dc3a4000ae6955ceaab9e5573eae815d0aba201",
      hash: "445dff4b951ffdd3b9b9b1b56ccd0bcf788ae91be023d6302d8c2643",
    },
    {
      title: "minting_data.spend",
      datum: {
        title: "_minting_data",
        schema: {
          $ref: "#/definitions/Data",
        },
      },
      redeemer: {
        title: "redeemer",
        schema: {
          $ref: "#/definitions/minting_data~1MintingDataRedeemer",
        },
      },
      parameters: [
        {
          title: "legacy_policy_id",
          schema: {
            $ref: "#/definitions/ByteArray",
          },
        },
        {
          title: "god_verification_key_hash",
          schema: {
            $ref: "#/definitions/ByteArray",
          },
        },
      ],
      compiledCode:
        "5915b7010000323232323232322322322232323232322533300d32323253330103007301137540022646464646464646464646464646464646464646464646464646464646464646464646464646464a66606e605a04c26666600205204e6eb0c0f0c0e4dd501881aa5115333037302e0261333330010290273758607860726ea80c40d5280a99981b99198008009bac303d303e303e303e303e303e303e303e303e303a375405444a66607800229404c94ccc0e8cdc79bae303f00203614a2266006006002607e00229445888888c8c8c8c8c8c8c8c8c94ccc110c0e8c114dd500089919192999198241800980a80809991191999800800809801a5eb7bdb18088894ccc14400c54ccc138cdd7981898281baa0083031305037540142a66609c66ebcdd3180d1bab3032305037540106e98c068dd5981918281baa00a1533304e3371260326eacc0c8c140dd5005180c9bab3032305037540102a66609c66ebcc0ccc140dd500419ba548010cc148c094cc148dd480125eb812f5c02a66609c66ebcc14cc150c150c150c140dd500426103d87a80001533304e3375e6e98cc07403d22100374c00229445858585858584c8c8c8c8c8c8c8c94ccc158c8c8c94ccc1654ccc16407c4ccc1640052825114a22a6660b20022a6660b266e24dc6803a40702a6660b266e24dc68012403c2944585854ccc164ccc1640152825115333059337126e3401d201e14a22c2c2c602260b26ea8c174c178008dd7182e00099299982b9826982c1baa00113253330583375e605800298103d87a800013305c3752002660b86660b094530103d87a80004c0103d87980004bd700b1981b802981c9bad305c30593754002297ae1010140008103d8798000181500209999806006004299982b18268008a99982b19b8f3302b00400600a133302c00448810000616153330563370e90008008a99982b19b8f33302c0044890000600a13302b004006161653330560021333302900900d3371491104000000000000400113333029333302900900d33714910104000643b00000400100d33714910104000de1400000400116375a60b460b6004601a60aa6ea8c164004c164008dd7182b800982b8011bac30550013051375460a800860a8006a66609066e1cdc6801a408020062ca66609001c200c201e6e21200016304b008375c6094608e6ea94ccc114c0f0ccc054dd5981498239baa00148811cf0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a00488120000de14068616e646c65735f726f6f744068616e646c655f73657474696e6773001325333046303e3047375400226464004a66608e607a60906ea80044c8c94ccc130c13c00852616375c609a00260926ea800458c12cc120dd50008b181518239baa001163049304a304637546092608c6ea800458cc050dd61824004119baf30273046375400201a6eb8c11cc110dd50012999820981b98211baa001132323232323232323232323232323232533305430570021323232498c09401cc090030cc1280348dd70008b1bae30550013055002375c60a600260a600460a200260a20046eb4c13c004c13c008dd698268009826801182580098258011bac30490013049002375c608e00260866ea800458c114c118c118c108dd5192999820981b98211baa0011325333042303a3043375400226464004a666086607260886ea80044c8c8c8c8c8c94ccc130c13c00852616304d001304d002375a609600260960046eb8c124004c114dd50008b182398221baa00116302630433754604a60866ea8c118c10cdd50008b198089bac3045004230383330113756604a60866ea8c094c10cdd5000a4411cf0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a00488118000de14064656d694068616e646c655f73657474696e67730037566088608a608a0046eb0c10c004c10c004c108004c0f4dd50029199803000a441004881002330040014890030010012253330370011480004c058cc008008c0e800488c8cc00400400c894ccc0e000452f5bded8c0264646464a66607266e4401c00854ccc0e4cdc78038010801880289981e99bb037520046e98004cc01801800cdd5981d0019bae3038002303c002303a001222325333034302b303537540022900009bad30393036375400264a6660686056606a6ea80045300103d87a80001323300100137566074606e6ea8008894ccc0e4004530103d87a8000132323232533303a337220100042a66607466e3c0200084c044cc0f8dd4000a5eb80530103d87a8000133006006003375a60760066eb8c0e4008c0f4008c0ec004c8cc004004010894ccc0e00045300103d87a80001323232325333039337220100042a66607266e3c0200084c040cc0f4dd3000a5eb80530103d87a8000133006006003375660740066eb8c0e0008c0f0008c0e800488c8cc00400400c894ccc0d80045300103d87a800013232533303530050021300c330390024bd70099802002000981d001181c00092999817981298181baa0011323232325333036303900213232498c94ccc0d4c0ac0044c8c94ccc0e8c0f40084c926325333038302e00113232533303d3040002132498c05000458c0f8004c0e8dd50010a99981c18178008991919191919299982098220010a4c2c6eb4c108004c108008dd6982000098200011bad303e001303a37540042c60706ea800458c0ec004c0dcdd50018a99981a98160008a99981c181b9baa00314985858c0d4dd500118068018b181b800981b801181a80098189baa0011622225333031302700110041323233001001006225333037001133038337606ea4018dd3001a5eb7bdb1804c8c8c8c94ccc0e0cdc800500109981e19bb037520146e9801c01454ccc0e0cdc7805001099299981c9817981d1baa00113303d337606ea402cc0f8c0ecdd5000802080219299981ca99981e0008a5114a0298103d87a8000130103303d374c00297ae0323300100100222533303d00113303e337606ea402cdd400525eb7bdb1804c8c8c8c94ccc0f8cdc800780109982119bb0375201e6ea003801454ccc0f8cdc7807801099299981f981a98201baa001133043337606ea4040c110c104dd5000802080219299981f981a8008a6103d87a80001301633043375000297ae03370000201c26608466ec0dd48011ba800133006006003375a607e0066eb8c0f4008c104008c0fc0044cc0f0cdd81ba9002374c0026600c00c0066eacc0e400cdd7181b801181d801181c800991900118050009981a99bb037520046ea00052f5bded8c04646466002002900011299981819b8900300114c0103d87a8000153330303370e66e380100052080011300733034375000297ae01330020023012001371a0024464646660020029000001911299981a0008a45200000000000000000000000000000000000000000000000000000000000000000001323253330360021325333034302b303537540022646604666e2cdd6980c181b9baa001375c6032606e6ea8004dd7180d181b9baa0013039303a303637540020046070006002264a66606c004264a6660686058606a6ea80044c8cc08ccc040dd7181d0008031bae303a303b001303a30363754002004607000600226464a6466606a6056606c6ea800c4c8c8ccccc04c028020004ccc024024004010dd7181e181e80118011bad303b0013037375400626464a66606e605c60706ea80084c8c8ccccc058030028004ccc02c02c00400cc0f8c0fc008c010dd6981e800981c9baa0021323232323333301800e00c00133300d00d001304100b30123303f3750660420040186607e6ea4cc058008004cc0fcc100c10400d2f5c0600c6eb4c0fc00cdd7181f000981f000981c9baa303c007303c006303a0053700602c00a6072006606e004606e0026e50008888cc88c8ccc004005200000422253330350011330203300d00500200413232532333035302b30363754006264646666602601400e0026660100100020086eb8c0f0c0f4008c008dd6981d800981b9baa003132325333037302e30383754004264646666602c018012002666014014002006607c607e00460086eb4c0f4004c0e4dd50010991919191999980c007005800999806006000982080518091981f9ba83302100230190013303f37526602c0040026607e6080608200697ae03006375a607e0066eb8c0f8004c0f8004c0e4dd5181e003181e002981d0021b8030160043039002303700137280066e50008dd2a4000600200244a66605800229309929998168008a4c26464a66605866e40dd7181698188021bae302d00213300500533030002001163031002302f001302f0012325333028301e00113232533302d3030002149858dd7181700098151baa00215333028301f00113232533302d3030002149858dd7181700098151baa002163028375400244a66604e603a66e18005200413233716907f018009980380119b83001480104c8c8cdc5a400000266e2ccc03800c008004cc01c008cdc19804800a4008444446602e66601400a008600e0066666644444a66605c66e24015200e13301c3333301500500700300200100413301c00433333015300d0050070030020013300f0053007003333718900024080002666e31204048100004ccdc624100029020000999b8c48300052040001222223232533302a33302a3370e0046eb4c034c0b0dd5001a504a22660300026644a66605866e2001120101533302c33710004900809980d199980a002003001000a44120b22df1a126b5ba4e33c16fd6157507610e55ffce20dae7ac44cae168a463612a0013301a3333301300400648812085c09af929492a871e4fae32d9d5c36e352471cd659bcdb61de08f1722acc3b1004881200eb923b0cbd24df54401d998531feead35a47a99f4deed205de4af81120f97610048812000000000000000000000000000000000000000000000000000000000000000000033333013300b00200148812085c09af929492a871e4fae32d9d5c36e352471cd659bcdb61de08f1722acc3b1004881200eb923b0cbd24df54401d998531feead35a47a99f4deed205de4af81120f9761004881200000000000000000000000000000000000000000000000000000000000000000001533302c33712900800109980d244120b22df1a126b5ba4e33c16fd6157507610e55ffce20dae7ac44cae168a463612a003333014300b004006300b00200113301a333330130020014892085c09af929492a871e4fae32d9d5c36e352471cd659bcdb61de08f1722acc3b1004881200eb923b0cbd24df54401d998531feead35a47a99f4deed205de4af81120f97610048812000000000000000000000000000000000000000000000000000000000000000000033333013300b00400648812085c09af929492a871e4fae32d9d5c36e352471cd659bcdb61de08f1722acc3b1004881200eb923b0cbd24df54401d998531feead35a47a99f4deed205de4af81120f976100488120000000000000000000000000000000000000000000000000000000000000000000375a601a60586ea800ccc060dd7180718161baa003375c601e60586ea800c58ccc028018014c01c010cc038014c01800cdc0240026e01200f2233371800266e04dc6801000801111191980080080191299981219b8900300114881001337166601400a00266004004600c0026e01200223023001230223023001230213022302200122533301c30123370c0029002099b833371c00466e0c0052004480804cdc319b8e0023370600290022404044444a66603c66e24015200613300c333300800500400200100313300c003333300830070050040020012222533301c3371000890040a99980e19b88002480204cc028cccc01c01000c0080052212085c09af929492a871e4fae32d9d5c36e352471cd659bcdb61de08f1722acc3b10013300a3333006004003489200eb923b0cbd24df54401d998531feead35a47a99f4deed205de4af81120f97610048812000000000000000000000000000000000000000000000000000000000000000000033330063005002001489200eb923b0cbd24df54401d998531feead35a47a99f4deed205de4af81120f9761004881200000000000000000000000000000000000000000000000000000000000000000001533301c33712900400109980524412085c09af929492a871e4fae32d9d5c36e352471cd659bcdb61de08f1722acc3b10033330073005004003300500200113300a33330060020014881200eb923b0cbd24df54401d998531feead35a47a99f4deed205de4af81120f97610048812000000000000000000000000000000000000000000000000000000000000000000033330063005004003489200eb923b0cbd24df54401d998531feead35a47a99f4deed205de4af81120f976100488120000000000000000000000000000000000000000000000000000000000000000000370090039111299980d19b89004480084cc020ccc01c01000c0040084cc020008ccc01cc01801000c00488894ccc064cdc4002240082a66603266e2000920041330073330060040030014881200eb923b0cbd24df54401d998531feead35a47a99f4deed205de4af81120f976100133007333006004003488120000000000000000000000000000000000000000000000000000000000000000000333006300500200148812000000000000000000000000000000000000000000000000000000000000000000015333019337129002001099803a441200eb923b0cbd24df54401d998531feead35a47a99f4deed205de4af81120f976100333006300500400300113300733300600200148920000000000000000000000000000000000000000000000000000000000000000000333006300500400348812000000000000000000000000000000000000000000000000000000000000000000037009001911299980b19b89003480004cc0100080044cc01000400888dca19b8a00200130123754016602a60246ea800458c050c054008c04c004c03cdd50008a4c26cac6464a66601a600600226464a666024602a0042649319804000918028008b1bac3013001300f375400e2a66601a600800226464a666024602a0042649319804000918028008b1bac3013001300f375400e2a66601a600a0022a666020601e6ea801c5261616300d375400c4a6660186004601a6ea80044c8c8c8c8c8c8c8c94ccc05cc0680084c9263300d0072325333016300c001132323232533301d3020002149858dd7180f000980f0011bad301c001301837540042a66602c601a002264646464a66603a604000426493299980d1808180d9baa001132323232323253330233026002149858dd7181200098120011bae30220013022002375a604000260386ea80045858c078004c078008dd6980e000980c1baa00215333016300e0011323232323232533301f3022002149858dd7181000098100011bae301e001301e002375a603800260306ea800858c058dd50008b1bad301800130180023253330153014001153330123009301300114a22a6660246010602600229405858dd5180b000980b0011bae3014001301400237586024002601c6ea800458dc3a40006e1d2002370e90021119198008008019129998070008a4c264660060066024004600660200026eb8004dd7000ab9a5573aaae7955cfaba05742ae89",
      hash: "b4e008c4ff1c73fcb51358e39a439eb0827dd089c621175114478123",
    },
    {
      title: "orders.spend",
      datum: {
        title: "datum",
        schema: {
          $ref: "#/definitions/decentralized_minting~1orders~1OrderDatum",
        },
      },
      redeemer: {
        title: "redeemer",
        schema: {
          $ref: "#/definitions/decentralized_minting~1orders~1OrderRedeemer",
        },
      },
      compiledCode:
        "5907c60100003232323232323223232322322533300832323232323232325333010300d30113754602a602c01026464a64646660286022602a6ea803c4c8c8c8c8cc00400400c88c94ccc068c0600044c8c8cc004004034894ccc080004528099299980f19b8f375c604600400829444cc00c00c004c08c004dd7180f980e1baa0021533301a30170011323300100137586040603a6ea800c894ccc07c004528899299980e9980300318110010998018018008a5030220011533301a30080011323300100137586040603a6ea800c894ccc07c004528099299980e9980300318110010a5113300300300130220011533301a3370e900300089919b89375a604000264660020026eb0c084c088008894ccc0800045200013322533301f33008008002133700002900108009811000998010011811800980e1baa0021533301a3370e900400089919299980e180c980e9baa001132533301d32533302130200011533301e301b301f00114a22a66603c6038603e00229405858dd51806180f9baa300c301f375401e266e2400400c4cdc40008019bad3021301e37540022940c01cc074dd51805180e9baa00d375a603e60386ea800854ccc068cdc3a401400226464a6660386032603a6ea80044c94ccc074c94ccc084c08000454ccc078c06cc07c0045288a99980f180e180f8008a50161637546018603e6ea8c024c07cdd5007899b890030011337100060026eb4c084c078dd50008a503007301d3754600e603a6ea8034dd6980f980e1baa00213300a00e30073301e3374a90011980f180f980e1baa0024bd7025eb80c068dd50009991918008009119299980d180c00089919299980f98110010a4c2c6eb8c080004c070dd50010a99980d180b80089919299980f981100109924c6600c00246600c00c0022c6eb0c080004c070dd50010a99980d180400089919299980f981100109924c6600c00246600c00c0022c6eb0c080004c070dd50010a99980d19b87480180044c8c8c8c94ccc084c0900084c92633008001233008008001163758604400260440046eb4c080004c070dd50010a99980d19b87480200044c8c94ccc07cc08800852616375a604000260386ea800854ccc068cdc3a401400226464a66603e60440042930b1bad3020001301c37540042a66603466e1d200c00113232533301f3022002149858dd71810000980e1baa00216301a375400244646600200200644a66603a0022930991980180198108011801980f8008009800980b9baa0142301a0011330040083001330183374a90011980c180c980b1baa325333015301330163754002264a66602c6008602e6ea80044c8c80094ccc05cc054c060dd50008991919191919299981018118010a4c2c604200260420046eb4c07c004c07c008dd7180e800980c9baa00116301b301837540022c603460366036602e6ea8c010c05cdd5180d180b9baa00116323300100100b22533301900114c103d87a800013232533301830153253330193016301a37540022900009bad301e301b375400264a666032602c60346ea80045300103d87a8000132330010013756603e60386ea8008894ccc078004530103d87a8000132323232533301f3372291118000de14064656d694068616e646c655f73657474696e6773000021533301f3371e910118000de14064656d694068616e646c655f73657474696e6773000021300c33023375000297ae014c0103d87a8000133006006003375a60400066eb8c078008c088008c080004c8cc004004dd59804180d9baa3008301b375400644a66603a002298103d87a8000132323232533301e337229111cf0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a000021533301e3371e91011cf0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a000021300b33022374c00297ae014c0103d87a80001330060060033756603e0066eb8c074008c084008c07c0044c014cc0700092f5c0266008008002603a004603600297ae04bd701ba548000dc3a40084602e603000244646600200200644a66602e00229404c94ccc054cdd7802180b180d0010a51133003003001301a0011637586028602a004602600260260046eacc044004c044c044c044c044c044008dd61807800980798059baa300e001300a375400229309b2b19299980398028008a99980518049baa00214985854ccc01cc01000454ccc028c024dd50010a4c2c2c600e6ea8004c94ccc014c00cc018dd500209919191919192999807180880109924ca666016601260186ea80044c8c94ccc040c04c0084c926533300d300b300e3754002264646464a666028602e0042646493192999809980880089919299980c180d80109924c64a66602c602800226464a666036603c00426493180a0008b180e000980c1baa0021533301630130011323232323232533301f3022002149858dd6981000098100011bad301e001301e002375a603800260306ea800858c058dd50008b180c800980a9baa00315333013301000115333016301537540062930b0b18099baa002300d00316301500130150023013001300f37540022c2c6022002601a6ea80045858c03c004c03c008dd718068009806801180580098039baa004162325333006300400113232533300b300e002149858dd7180600098041baa00215333006300300113232533300b300e002149858dd7180600098041baa00216300637540026e1d2002370e90002b9a5573aaae7955cfaba05742ae881",
      hash: "a3f1aad189610ecc765b5db897b963a6e07ad62d91297094563ed6fc",
    },
  ],
  definitions: {
    Bool: {
      title: "Bool",
      anyOf: [
        {
          title: "False",
          dataType: "constructor",
          index: 0,
          fields: [],
        },
        {
          title: "True",
          dataType: "constructor",
          index: 1,
          fields: [],
        },
      ],
    },
    ByteArray: {
      dataType: "bytes",
    },
    Data: {
      title: "Data",
      description: "Any Plutus data.",
    },
    Int: {
      dataType: "integer",
    },
    "List$aiken/merkle_patricia_forestry/ProofStep": {
      dataType: "list",
      items: {
        $ref: "#/definitions/aiken~1merkle_patricia_forestry~1ProofStep",
      },
    },
    "List$validations/minting_data/types/Proof": {
      dataType: "list",
      items: {
        $ref: "#/definitions/validations~1minting_data~1types~1Proof",
      },
    },
    "Option$aiken/transaction/credential/Referenced$aiken/transaction/credential/Credential":
      {
        title: "Optional",
        anyOf: [
          {
            title: "Some",
            description: "An optional value.",
            dataType: "constructor",
            index: 0,
            fields: [
              {
                $ref: "#/definitions/aiken~1transaction~1credential~1Referenced$aiken~1transaction~1credential~1Credential",
              },
            ],
          },
          {
            title: "None",
            description: "Nothing.",
            dataType: "constructor",
            index: 1,
            fields: [],
          },
        ],
      },
    "aiken/merkle_patricia_forestry/Neighbor": {
      title: "Neighbor",
      description:
        "since          | <code>1.0.0</code>\n ---            | ---\n\n A neighbor node used in a proof. See [Proof](#Proof) for details.",
      anyOf: [
        {
          title: "Neighbor",
          dataType: "constructor",
          index: 0,
          fields: [
            {
              title: "nibble",
              $ref: "#/definitions/Int",
            },
            {
              title: "prefix",
              $ref: "#/definitions/ByteArray",
            },
            {
              title: "root",
              $ref: "#/definitions/ByteArray",
            },
          ],
        },
      ],
    },
    "aiken/merkle_patricia_forestry/ProofStep": {
      title: "ProofStep",
      description:
        "since          | <code>1.0.0</code>\n ---            | ---\n\n We distinguish three kind of proof steps: Branch, Fork and Leaf. Each step\n contains a `skip` value which corresponds to the length of the common prefix\n at that particular level.\n\n The details of each level is documented [in the wiki :: Proof Format](https://github.com/aiken-lang/merkle-patricia-forestry/wiki/Proof-format).",
      anyOf: [
        {
          title: "Branch",
          dataType: "constructor",
          index: 0,
          fields: [
            {
              title: "skip",
              $ref: "#/definitions/Int",
            },
            {
              title: "neighbors",
              $ref: "#/definitions/ByteArray",
            },
          ],
        },
        {
          title: "Fork",
          dataType: "constructor",
          index: 1,
          fields: [
            {
              title: "skip",
              $ref: "#/definitions/Int",
            },
            {
              title: "neighbor",
              $ref: "#/definitions/aiken~1merkle_patricia_forestry~1Neighbor",
            },
          ],
        },
        {
          title: "Leaf",
          dataType: "constructor",
          index: 2,
          fields: [
            {
              title: "skip",
              $ref: "#/definitions/Int",
            },
            {
              title: "key",
              $ref: "#/definitions/ByteArray",
            },
            {
              title: "value",
              $ref: "#/definitions/ByteArray",
            },
          ],
        },
      ],
    },
    "aiken/transaction/credential/Address": {
      title: "Address",
      description:
        "A Cardano `Address` typically holding one or two credential references.\n\n Note that legacy bootstrap addresses (a.k.a. 'Byron addresses') are\n completely excluded from Plutus contexts. Thus, from an on-chain\n perspective only exists addresses of type 00, 01, ..., 07 as detailed\n in [CIP-0019 :: Shelley Addresses](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0019/#shelley-addresses).",
      anyOf: [
        {
          title: "Address",
          dataType: "constructor",
          index: 0,
          fields: [
            {
              title: "payment_credential",
              $ref: "#/definitions/aiken~1transaction~1credential~1Credential",
            },
            {
              title: "stake_credential",
              $ref: "#/definitions/Option$aiken~1transaction~1credential~1Referenced$aiken~1transaction~1credential~1Credential",
            },
          ],
        },
      ],
    },
    "aiken/transaction/credential/Credential": {
      title: "Credential",
      description:
        "A general structure for representing an on-chain `Credential`.\n\n Credentials are always one of two kinds: a direct public/private key\n pair, or a script (native or Plutus).",
      anyOf: [
        {
          title: "VerificationKeyCredential",
          dataType: "constructor",
          index: 0,
          fields: [
            {
              $ref: "#/definitions/ByteArray",
            },
          ],
        },
        {
          title: "ScriptCredential",
          dataType: "constructor",
          index: 1,
          fields: [
            {
              $ref: "#/definitions/ByteArray",
            },
          ],
        },
      ],
    },
    "aiken/transaction/credential/Referenced$aiken/transaction/credential/Credential":
      {
        title: "Referenced",
        description:
          "Represent a type of object that can be represented either inline (by hash)\n or via a reference (i.e. a pointer to an on-chain location).\n\n This is mainly use for capturing pointers to a stake credential\n registration certificate in the case of so-called pointer addresses.",
        anyOf: [
          {
            title: "Inline",
            dataType: "constructor",
            index: 0,
            fields: [
              {
                $ref: "#/definitions/aiken~1transaction~1credential~1Credential",
              },
            ],
          },
          {
            title: "Pointer",
            dataType: "constructor",
            index: 1,
            fields: [
              {
                title: "slot_number",
                $ref: "#/definitions/Int",
              },
              {
                title: "transaction_index",
                $ref: "#/definitions/Int",
              },
              {
                title: "certificate_index",
                $ref: "#/definitions/Int",
              },
            ],
          },
        ],
      },
    "decentralized_minting/orders/Destination": {
      title: "Destination",
      anyOf: [
        {
          title: "Destination",
          dataType: "constructor",
          index: 0,
          fields: [
            {
              title: "address",
              $ref: "#/definitions/aiken~1transaction~1credential~1Address",
            },
          ],
        },
      ],
    },
    "decentralized_minting/orders/OrderDatum": {
      title: "OrderDatum",
      anyOf: [
        {
          title: "OrderDatum",
          dataType: "constructor",
          index: 0,
          fields: [
            {
              title: "owner",
              $ref: "#/definitions/Data",
            },
            {
              title: "requested_handle",
              $ref: "#/definitions/ByteArray",
            },
            {
              title: "destination",
              $ref: "#/definitions/decentralized_minting~1orders~1Destination",
            },
          ],
        },
      ],
    },
    "decentralized_minting/orders/OrderRedeemer": {
      title: "OrderRedeemer",
      anyOf: [
        {
          title: "Execute",
          dataType: "constructor",
          index: 0,
          fields: [],
        },
        {
          title: "Cancel",
          dataType: "constructor",
          index: 1,
          fields: [],
        },
      ],
    },
    "mint_v1/MintV1Redeemer": {
      title: "MintV1Redeemer",
      anyOf: [
        {
          title: "MintHandles",
          dataType: "constructor",
          index: 0,
          fields: [],
        },
        {
          title: "BurnHandles",
          dataType: "constructor",
          index: 1,
          fields: [],
        },
      ],
    },
    "minting_data/MintingDataRedeemer": {
      title: "MintingDataRedeemer",
      anyOf: [
        {
          title: "MintOrBurnNewHandles",
          dataType: "constructor",
          index: 0,
          fields: [
            {
              $ref: "#/definitions/List$validations~1minting_data~1types~1Proof",
            },
          ],
        },
        {
          title: "MintOrBurnLegacyHandles",
          dataType: "constructor",
          index: 1,
          fields: [
            {
              $ref: "#/definitions/List$validations~1minting_data~1types~1Proof",
            },
          ],
        },
        {
          title: "GodMode",
          dataType: "constructor",
          index: 2,
          fields: [],
        },
      ],
    },
    "validations/minting_data/types/Proof": {
      title: "Proof",
      anyOf: [
        {
          title: "Proof",
          dataType: "constructor",
          index: 0,
          fields: [
            {
              title: "mpt_proof",
              $ref: "#/definitions/List$aiken~1merkle_patricia_forestry~1ProofStep",
            },
            {
              title: "handle_name",
              $ref: "#/definitions/ByteArray",
            },
            {
              title: "is_virtual",
              $ref: "#/definitions/Bool",
            },
            {
              title: "amount",
              $ref: "#/definitions/Int",
            },
          ],
        },
      ],
    },
  },
};
