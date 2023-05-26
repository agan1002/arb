<template>
	<view class="form">
		<!-- <view class="contract-form-title">认证信息</view> -->
		<view class="form-tip">{{tipsText}}</view>
		<slot name="form" class="form-content"></slot>
		<view class="form-agree">
			<uni-icons v-show="!flag" type="circle" @click="changeFlag"></uni-icons>
			<uni-icons v-show="flag" class="contract-form-agree-icon" type="circle-filled" @click="changeFlag"></uni-icons>
			<text class="contract-form-agree-text">我同意
				<text class="contract-form-agree-text-btn" @click="openPopup('popupDeal',2)">《电子印章服务协议》</text>
				<text class="contract-form-agree-text-btn" @click="openPopup('popupDeal',3)">《隐私政策》</text>
				<text class="contract-form-agree-text-btn" @click="openPopup('popupDeal',4)">《数字证书服务协议》</text>
			</text>
		</view>
		<!-- <slot name="light"></slot> -->
		<!-- <full-light v-if="isFuLight"></full-light> -->
		<view class="page-bottom-btn">
			<button v-show="!flag||!identifyFlag" size="default" type="default" disabled>确认</button>
			<button v-show="flag&&identifyFlag" class="page-bottom-btn-ok" @click="toNext">确认</button>
		</view>
		<uni-popup ref="popupDeal" type="center" background-color="#fff">
			<scroll-view style="height: 80vh;" scroll-y="true" class="popup-preread-scroll">
			<view class="popup-preread">
				<rich-text :nodes="protocolContent" class="popup-preread-content"></rich-text>
				<button @click="closePopup('popupDeal')" class="popup-preread-btn" size="default" type="primary">
					我已阅读
				</button>
			</view>
			</scroll-view>
		</uni-popup>
		
	</view>
</template>

<script>
	// import {UniForms} from '@dcloudio/uni-ui'
	import FullLight from '@/components/full-light.vue';
	export default {
		name:"info-form",
		props:{
			"identifyFlag":{
				type:Boolean,
			},"isFuLight":{
				type:Boolean,
				default:true
			},
			tipsText: {
				type: String,
				default: '请确认以下信息，如非本人操作，请退出当前页面'
			}
		},
		data() {
			return {
				flag:false,
				protocolContent:'',
				protocolContentList:[
					{
						"id": "1438744153510158338",
						"name": "电子印章服务协议",
						"type": 2,
						"protocolContent": "<p style=\"text-align:center;text-indent:2em;\" class=\"MsoNormal\" align=\"center\"><span style=\"line-height:150%\"><span style=\"font-size:14ptpx\">电子印章服务协议</span></span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">四川省数字证书认证管理中心有限公司（简称“四川CA”）作为第三方电子认证服务机构，为用户提供电子印章、数字证书相关产品及服务。为明确各方权利和义务，四川CA与用户就电子印章申请、管理、使用及数字证书服务等事宜达成《电子印章服务协议》及《数字证书服务协议》，双方共同遵守执行。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（一）</span> <span style=\"font-size:10.5ptpx\">用户确认，在签订本协议之前，已认真阅读并完全理解了本《电子印章服务协议》、《数字证书服务协议》。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（二）</span> <span style=\"font-size:10.5ptpx\">用户承诺，在接受本协议并申请电子印章时，已经年满18周岁并具备完全的民事行为能力，或者是在中国大陆地区依法设立并合法开展经营活动或其他业务的法人或其他组织。在申请电子印章时或在此后任何时间，用户不具备前述条件的，请立即停止使用本服务。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（三）</span> <span style=\"font-size:10.5ptpx\">用户同意，在使用电子印章服务时，应自行判断对方是否具有完全民事行为能力，且确定对方提供的信息真实准确，并自行决定是否与对方进行签约等，用户应自行承担与此相关的所有风险。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（四）</span> <span style=\"font-size:10.5ptpx\">用户承诺，在向四川CA申请电子印章时，须保证自己所提供的信息及资料的真实性、完整性和准确性，否则须全部承担由此造成相关各方损失。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（五）</span> <span style=\"font-size:10.5ptpx\">四川CA对用户提供的资料进行审核，审核通过后告知用户并向用户签发电子印章。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（六）</span> <span style=\"font-size:10.5ptpx\">四川CA签发的电子印章仅用于表明用户在申请电子印章时所要标识的身份及对应的印模图片信息，用于验证用户的数字签名，并直观展示用户在申请数字证书时提交的印模图片信息。如果用户将该电子印章用于其他用途或申请证书时上传了不属于自己的印模图片信息，四川CA不承担任何由此产生的责任和义务。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（七）</span> <span style=\"font-size:10.5ptpx\">用户应当妥善保管四川CA所签发的电子印章、数字证书及相关保护密码、口令。如上述信息非因四川CA原因失密，用户应当自行承担一切损失。如因四川CA过错，发生数字证书被伪造、篡改的，四川CA按照电子认证业务规则（cps）承担相应的赔偿责任。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（八）</span> <span style=\"font-size:10.5ptpx\">电子印章一律不得转让、转借或转用。因转让、转借或转用而产生的一切损失将由用户自行承担。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（九）</span> <span style=\"font-size:10.5ptpx\">电子印章的有效期为其所对应的数字证书的有效期。如用户拟在到期后继续使用电子印章，则须在到期前一个月内向四川CA或其受理点提出电子印章更新请求。否则，电子印章到期将自动失效，四川CA对此不承担任何责任。  </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（十）</span> <span style=\"font-size:10.5ptpx\">如用户电子印章中的信息发生变更，用户应当及时向四川CA申请变更电子印章，四川CA收到用户申请变更的资料后将尽快完成变更操作，在未完成电子印章信息变更前，用户应停止使用电子印章，避免因此给自身或相对方造成不必要的损失，如用户未及时申请电子印章信息变更而继续使用的，因此所造成的责任由用户自行承担，如因此造成四川CA损失的，用户应承担全部赔偿责任。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（十一）如用户发生电子印章丢失，或用户不希望继续使用电子印章、用户依法被吊销营业执照或清算等情况，用户应当立即向四川CA申请注销电子印章，注销手续应遵循四川CA的要求。四川CA自接到用户注销申请资料时起，在  8  小时内注销用户的电子印章。用户应当承担在电子印章注销之前所有使用电子印章而造成的责任，如因此造成四川CA损失的，用户应承担全部赔偿责任。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（十二）对于下列情况之一，四川CA有权主动注销所签发的电子印章： </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">1) 用户在申请办理电子印章时，提供虚假信息和资料；  </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">2) 用户未按照规定缴纳电子印章相关费用；  </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">3) 电子印章对应的数字证书私钥泄露或发生其他电子印章的安全性不能得到保证的情况；</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">4) 用户不能履行或违反相关法律、法规和本协议所规定的其他责任和义务；  </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">5) 法律法规规定的其他情形。  </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（十三）如果产品需要升级，四川CA将<span style=\"color:#000000\">会通过成都住房租赁系统或成都市住房和城乡建设局官方网站（http://cdzj.chengdu.gov.cn/）进行公示通知，</span>敬请用户随时密切关注最新通知。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（十四）本协议除因电子印章到期而用户不再更新而终止外，还可因下列原因之一而提前终止：</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">1）用户因不希望继续使用或依法被吊销营业执照或清算等情况而申请注销电子印章；  </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">2）四川CA根据本协议第十二条规定主动注销用户电子印章。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">因上述原因提前终止时，四川CA所收费用均不予退还。  </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（十五）用户点击页面上的“申请印章”时起，本协议生效。本协议生效后，四川CA及用户均应依诚实守信之原则履行协议项之全部义务，若因本协议的履行、解释、赔偿所产生的一切争议，经双方协商不能解决，任何一方均可将争议提交四川CA所在地有管辖权的人民法院诉讼解决。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"> </p><p style=\"text-align:center;text-indent:2em;\" class=\"MsoNormal\" align=\"center\"><span style=\"font-size:14ptpx\">数字证书服务协议</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">四川省数字证书认证管理中心有限公司（简称“四川CA”）是工业和信息化部批准的电子认证服务机构和国家密码管理局批准的电子政务电子认证服务机构，遵照《中华人民共和国电子签名法》为用户提供数字证书相关的电子认证服务。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">本协议中的“用户”指数字证书持有人以及申请使用数字证书的实体。数字证书（以下简称“证书”），是指包含数字证书使用者身份信息和公开密钥的电子文件。能够标识您的身份，用于网络系统登录身份认证及确保您使用数字证书进行签名的电子数据的真实性、完整性、机密性和抗抵赖性，四川CA将对您进行身份鉴证，当您通过身份鉴证后四川CA将为您签发数字证书。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">为明确各方权利和义务，四川CA和用户就数字证书的申请和使用等事项达成以下协议，双方共同遵守执行。本《数字证书服务协议》为钜信签平台《用户服务协议》的重要组成部分，用户点击同意即表示同意并认可本《数字证书服务协议》。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（一）用户知晓证书用于在网络上标识用户身份及电子签名，应按照业务系统的要求使用证书，不作其他任何用途。用户应正确使用证书，所有使用证书在网上作业中的活动均视为用户所为，用户对使用证书的行为负责，因此而产生的相关后果由用户自行承担。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（二）用户同意四川CA向有关部门和个人核实用户信息且四川CA有权合法收集、处理、传递和应用用户资料，并按照国家有关规定对用户资料保密。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（三）用户申请证书时应提供真实、完整、准确的资料和信息。如用户故意或过失提供不真实资料和信息而导致四川CA签发证书错误的，造成相关各方损失的，由用户承担因此所造成的相关责任和损失。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（四）非四川CA过错而导致签发数字证书延迟、中断或者无法签发的，四川CA不承担赔偿责任。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（五）用户提供的资料信息(如机构名称、统一社会信用代码、个人用户的姓名、身份证号等)在证书有效期内变更的，应当及时书面告知四川CA，并终止使用证书。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（六）证书一律不得转让、转借或转用。因转让、转借或转用而产生的相关后果应当由用户自行承担。如因用户原因致使证书私钥泄露、损毁或者丢失的，损失由用户自行承担。如证书私钥在证书有效期内泄露、损毁、丢失或可能泄露、损毁、丢失的，用户应及时向四川CA申请办理吊销手续。证书吊销申请受理后24小时内生效，期间用户自行承担使用数字证书造成的一切责任。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（七）用户应确保其应用系统能为证书提供安全的应用环境，若因网络、主机、操作系统或其他软硬件环境等存在安全漏洞，由此导致的安全事故及相关后果，四川CA不承担责任。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（八）用户终止使用证书时，应当立即申请吊销证书。证书吊销申请受理后24小时内生效，期间用户自行承担使用数字证书造成的一切责任。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（九）如果单位证书用户单位解散、注销或个人证书用户失去民事行为能力、死亡，法定责任人需要携带相关证明文件及原证书，向四川CA请求吊销用户证书。相关责任人应当承担其证书在吊销生效前相关行为所产生的责任。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（十）下列情形之一，四川CA有权吊销证书并不承担任何责任。由此给四川CA造成损失的，用户应当向四川CA承担赔偿责任：</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">1、提供的资料或信息不真实、不完整或不准确的；</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">2、证书相关信息有变更或证书私钥已经丢失或可能丢失，未终止使用该证书并通知四川CA的；</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">3、用户未履行本协议所规定的责任和义务；</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">4、法律、法规规定的其他情形。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（十一）证书在有效期届满后自动失效。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（十二）四川CA承诺，由于四川CA过错导致数字证书签发错误或证书私钥被破译并对用户造成损失的，四川CA按照电子认证业务规则（cps）承担相应的赔偿责任。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:10.5ptpx\">（十三）用户点击页面上的“申请印章”时起，本协议生效。本协议生效后，四川CA及用户均应依诚实守信之原则履行协议项之全部义务，若因本协议的履行、解释、赔偿所产生的一切争议，经双方协商不能解决，任何一方均可将争议提交四川CA所在地有管辖权的人民法院诉讼解决。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"> </p>",
						"createTime": "1631858311000",
						"status": 1
					},
				{
				  "id": "1438744002871730177",
				  "name": "用户隐私政策",
				  "type": 3,
				  "protocolContent": "<p style=\"text-align:center;text-indent:2em;\" class=\"MsoNormal\" align=\"center\"><strong><span style=\"font-size:16ptpx\">隐私政策</span></strong></p><p style=\"text-align:left;text-indent:2em;\" class=\"MsoNormal\" align=\"left\"><span style=\"font-size:12ptpx\"><a>更新日期：2021年 7月 29日；</a></span></p><p style=\"text-align:left;text-indent:2em;\" class=\"MsoNormal\" align=\"left\"><span style=\"font-size:12ptpx\">生效日期：2021年 7月 29日。</span><a href=\"#_msocom_1\" language=\"JavaScript\" name=\"_msoanchor_1\" class=\"msocomanchor\">[段1]</a> </p><p style=\"text-align:left;text-indent:2em;\" class=\"MsoNormal\" align=\"left\"> </p><p style=\"text-align:left;text-indent:2em;\" class=\"MsoNormal\" align=\"left\"><strong><span style=\"font-size:12ptpx\">尊敬的用户：</span></strong></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\"><span style=\"color:#000000\">四川省数字证书认证管理中心有限公司（简称“四川CA”）为本电子签章平台（简称“本平台”）的建设者及运营者，四</span>川CA及本平台非常重视用户的隐私和个人信息保护。您在使用本电子签章平台产品与/或服务时，本平台可能会收集和使用您的相关信息。本平台希望通过本《隐私政策》（本隐私政策或本政策）向您说明在您使用电子签章产品与/或服务时如何收集、使用、保存、共享和转让这些信息。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><strong><span style=\"font-size:12ptpx\">本隐私政策与您所使用的电子签章平台以及该产品所包括的各种业务功能（以下统称“本平台的产品与/或服务”）息息相关，您在使用电子签章产品与/或服务前务必仔细阅读，并确认您已经充分理解并认同本政策所写明的内容，并让您可以按照本隐私政策的指引做出您认为适当的选择。</span></strong></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><strong><span style=\"font-size:12ptpx\">您使用或在本平台更新本隐私政策后（本平台会及时提示您更新的情况）继续使用本平台的产品与/或服务，即意味着您同意本隐私政策(含更新版本)内容，并且同意本平台按照本隐私政策收集、使用、保存和共享您的相关信息。 </span></strong></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><strong><span style=\"font-size:12ptpx\">如果您不同意本政策的条款，应立即停止使用本平台服务。</span></strong></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><strong><span style=\"font-size:12ptpx\">本隐私政策将帮助您了解以下内容： </span></strong></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">一、本平台如何收集和使用您的个人信息 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">二、本平台如何使用 Cookie 和同类技术 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">三、本平台如何共享、转让、公开披露您的个人信息 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">四、本平台如何保护和保存您的个人信息 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">五、您如何管理个人/机构信息 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">六、本政策如何更新 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">七、如何联系本平台</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><strong><span style=\"font-size:12ptpx\">一、本平台如何收集和使用您的个人信息 </span></strong></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">为了向您提供服务、优化本平台的服务以及保障账号安全，本平台会按照如下方式收集、使用您的个人信息： </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（一）实现实名操作所必须的条件</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\"><strong>1、账号注册信息：</strong>当您首次注册登录电子签章平台，您需要提供<strong>您本人的手机号码</strong>等信息，并创建登录密码，上述信息为您使用电子签章平台所必需，若您不提供这类信息，您将无法正常使用本平台的服务。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\"><strong>2、实名认证信息：</strong>在您使用账号前，您需要进行实名认证，您需要提供您的个人/机构信息如<strong>真实姓名、身份证信息、面部生物特征、手机号码、机构名称、有效证照</strong>等信息。收集此类信息是为了实现本平台功能需要，也是为了满足相关法律法规的实名制要求，若您不提供这类信息，您将无法完成实名认证，亦无法使用电子签章平台的服务。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\"><strong>3、数字证书信息：</strong>在为您申请数字证书后，本平台会保留您的<strong>数字证书信息</strong>，此信息包含您的<strong>姓名、身份信息</strong>，以及为您申请的<strong>数字证书序列号</strong>，以便供您在进行数字签名及验证时调用。若您不授权本平台保存此信息，您将无法正常使用本平台的服务。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\"><a>4</a>、电子签约信息：您使用数字证书、电子签章签署电子合同后，本平台会保存您的签约电子数据信息，方便您查阅、检索签约信息。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（二）向您提供产品或服务 当您使用电子签章平台服务时，为了维护本平台服务的正常运行，改进及优化本平台的服务体验以及保障您的账号安全，<strong>本平台会收集您下述信息：</strong></span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\"><strong>1、日志信息：</strong>本平台会收集您对本平台服务的详细使用情况，作为有关日志保存，包括接入网络的方式、类型和状态、网络质量数据、操作日志、服务日志信息。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">2、您通过本平台的客服、平台留言或参加本平台举办的活动时所提交的信息：当您与本平台联系时，本平台可能会保存您的通信/通话记录和内容或您留下的联系方式等信息，以便与您联系或帮助您解决问题，或记录相关问题的处理方案及结果。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（三）其他用途 本平台在基于本协议未载明的其他特定目的收集您的信息时，会事先征求您的同意。本平台收集及使用上述信息的目的是为了更好地运营电子签章平台产品和服务，并且会通过包括但不限于通过平台通知、电子邮件、电话或短信信息等方式通知。如本平台停止运营电子签章平台产品或服务，本平台将及时停止收集您个人信息的活动，停止运营的通知以逐一送达或公告的形式通知您，对所持有的个人信息进行删除或匿名化处理。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（四）<strong>例外 您充分知晓，以下情形中，本平台收集、使用个人信息无需征得您的授权同意： </strong></span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">1、与国家安全、国防安全有关的； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">2、与公共安全、公共卫生、重大公共利益有关的； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">3、与犯罪侦查、起诉、审判和判决执行等有关的； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">4、出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">5、所收集的个人信息是个人信息主体自行向社会公众公开的； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">6、从合法公开披露的信息中收集的您的个人信息的，如合法的新闻报道、政府信息公开等渠道； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">7、用于维护所提供的产品与/或服务的安全稳定运行所必需的，例如发现、处置产品与/或服务的故障； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">8、法律法规规定的其他情形。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><strong><span style=\"font-size:12ptpx\">二、本平台如何使用 Cookie 和同类技术 </span></strong></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">为使您获得更轻松的访问体验，您使用本平台的产品或服务时，本平台可能会通过采用各种技术收集和存储您访问电子签章平台服务的相关数据，在您访问或再次访问电子签章平台服务时,本平台能识别您的身份，并通过分析数据为您提供更好更多的服务。包括使用小型数据文件识别您的身份，这么做是为了解您的使用习惯，帮您省去重复输入账户信息的步骤，或者帮助判断您的登录状态以及账户安全。这些数据文件可能是Cookie、Flash Cookie，或您的浏览器或关联应用程序提供的其他本地存储（统称“Cookie”）。 本平台不会将 Cookies 用于本隐私政策所述目的之外的任何用途。您可根据自己的偏好管理或删除 Cookies。您可以清除计算机上保存的所有 Cookies，大部分网络浏览器会自动接受Cookies，但您通常可根据自己的需要来修改浏览器的设置以拒绝 Cookies；另外，您也可以清除软件内保存的所有Cookies。但如果您这么做，您可能需要在每一次访问本平台时亲自更改用户设置，而且您之前所记录的相应信息也均会被删除。</span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><strong><span style=\"font-size:12ptpx\">三、本平台如何共享、转让、公开披露您的个人信息 </span></strong></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（一）<strong>共享 本平台不会与其他任何公司、组织和个人共享您的个人信息，但以下情况除外：</strong></span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">1、事先获得您明确的同意或授权； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">2、根据适用的法律法规、法律程序的要求、强制性的行政或司法要求所必须的情况下进行提供； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">3、只有共享您的信息，才能实现本平台的产品与/或服务的核心功能或提供您需要的服务； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">4、应您合法需求，协助处理您与他人的纠纷或争议； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">5、根据与您签署的相关协议（包括在线签署的电子协议以及相应的平台规则）或其他的法律文件约定所提供； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">6、基于符合法律法规的社会公共利益而使用。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">7、与授权的供应商和服务提供方共享：为实现本隐私政策中声明的目的，本平台会与本平台的供应商和服务提供方共享您的某些个人信息，具体如下： </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">本平台会将您的<strong>真实姓名、身份证信息、手机号码以及面部生物特征</strong>等信息共享给实名认证机构，以提供更好的客户服务和优化用户体验。本平台仅会出于合法、正当、必要、特定、明确的目的共享您的用户信息，并且只会共享提供服务所必要的用户信息。本平台的供应商和服务提供方无权将共享的用户信息用于任何其他用途。本平台将信息发送给支持本平台业务的供应商、服务提供商，这些支持包括提供基础技术服务等专业服务。例如，在您申请实名认证时，本平台会将您的个人信息传输至实名认证服务提供方，以便其完成对您的实名认证。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（二）<strong>转让 本平台不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：</strong></span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">1、在获取您明确同意的情况下转让：获得您的明确同意后，本平台会向其他方转让您的个人信息。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">2、在电子签章平台服务提供者发生合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到个人信息转让，本平台会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则本平台将要求该公司、组织和个人重新向您征求授权同意。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（三）<strong>公开披露 本平台仅会在以下情况下，才会披露您的信息：</strong></span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">1、根据您的需求，在您明确同意的披露方式下披露您所指定的信息； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">2、根据法律、法规的要求、强制性的行政执法或司法要求所必须提供您信息的情况下，本平台可能会依据所要求的信息类型和披露方式披露您的信息。在符合法律法规的前提下，当本平台收到上述披露信息的请求时，本平台会要求接收方必须出具与之相应的法律文件，如传票或调查函。本平台坚信，对于要求本平台提供的信息，应该在法律允许的范围内尽可能保持透明。本平台对所有的请求都进行了慎重的审查，以确保其具备合法依据，且仅限于执法部门因特定调查目的且有合法权利获取的数据。在向相关强制性的行政执法或司法机关披露后且前述机关允许的前提下，本平台会及时通过合理的方式通知您。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（四）<strong>共享、转让、公开披露个人信息时事先征得授权同意的例外以下情形中，本平台共享、转让、公开披露您的个人信息无需事先征得您的授权同意：</strong></span> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">1、与国家安全、国防安全直接相关的； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">2、与公共安全、公共卫生、重大公共利益直接相关的； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">3、与犯罪侦查、起诉、审判和判决执行等直接相关的； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">5、您自行向社会公众公开的个人信息； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">6、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><strong><span style=\"font-size:12ptpx\">四、本平台如何保护和保存您的个人信息</span></strong> </p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">本平台在中华人民共和国境内运营中收集和产生的信息，存储在中国境内。本平台将采取以下手段保护您的信息： </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（一）数据安全技术措施 本平台会采用符合业界标准的安全防护措施，安全技术解决方案来防止您的信息遭到未经授权的访问、使用、篡改,避免数据的损坏丢失或泄露。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（二）本平台为保护个人信息采取的其他安全措施 本平台通过建立信息资产管理程序及信息资产分级分类管理规定来规范信息和数据的存储和使用。同时，本平台仅允许有必要知晓这些信息的员工访问您的信息，并为此设置了严格的访问权限控制和监控机制。对于关键岗位员工录用前本平台都会经过背景调查，本平台同时要求可能接触到您的信息的所有人员签订保密协议并履行相应的保密义务。本平台也会定期开展关于个人信息和隐私保护的相关培训，不断提升员工对于用户个人信息和隐私的保护意识。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（三）个人隐私数据泄露事件处置 在不幸发生个人隐私数据泄露事件后，本平台将在10个工作日内向您告知：个人隐私数据泄露的基本情况和可能的影响、本平台已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。本平台同时将及时对事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知信息主体时，本平台会采取合理、有效的方式发布公告。同时，本平台还将按照监管部门要求，主动上报个人隐私数据泄露事件的处置情况。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><strong><span style=\"font-size:12ptpx\">五、您如何管理个人信息 </span></strong></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">本平台非常重视您对个人信息的关注，并尽全力保护您对于您个人信息访问、更正、删除的权利，以使您拥有充分的能力保障您的隐私和安全。您的权利包括： </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（一）访问、更正 如果您的信息出现变化，本平台鼓励您更新和修改您的信息以使其更准确有效。您有权访问您的信息，并根据对应信息的管理方式自行完成或要求本平台进行修改、补充。您可以联系我们的人工客服（400-028-1130），申请更正您的信息，我们承诺在15个工作日内完成核查和处理。在访问、更正前述信息时，本平台可能会要求您进行身份验证，以保障信息安全。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（二）注销 在您需要终止使用本平台的服务时，您可以申请注销您的账户，您可以联系本平台的客服（400-028-1130）申请注销您的账户，我们承诺在15个工作日内完成核查和处理。本平台在此善意地提醒您，您注销账户的行为会使您无法继续使用电子签章平台项下所有服务。注销账户后您的个人信息会保持不可被检索、访问的状态，本平台将不会再使用或对外提供与该账户相关的个人信息，但您在使用电子签章平台服务期间提供或产生的信息本平台仍需按照监管要求保存，且在保存的时间内依法配合有权机关按照合法程序查询。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><strong><span style=\"font-size:12ptpx\">六、本政策如何更新 </span></strong></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（一）为了给您提供更好的服务，本隐私政策也会随之更新。本平台会通过在本平台上发出更新版本并在生效前通过平台公告、公示或以其他适当方式提醒您相关内容的更新，也请您访问本平台以便及时了解最新的隐私政策。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（二）对于重大变更，本平台还会提供更为显著的通知（本平台会通过包括但不限于短信或在平台浏览页面做特别提示等方式）。本政策所指的重大变更包括但不限于： </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（1）本平台的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（2）本平台在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（3）个人信息共享、转让或公开披露的主要对象发生变化； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（4）本平台负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时； </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">（5）个人信息安全影响评估报告表明存在高风险时。 </span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><strong><span style=\"font-size:12ptpx\">七、如何联系本平台 </span></strong></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><span style=\"font-size:12ptpx\">如果您对本隐私政策有任何问题、意见或建议，或者需要就个人信息安全进行投诉、举报的，请通过访问在线客服系统或拨打本平台的客服电话（400-028-1130）等多种方式与本平台联系，一般情况下，本平台将在15个工作日内回复。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\"><br/> </p>",
						"createTime": "1631858275000",
						"status": 1
					}
				,{
  "id": "1419965894693761026",
  "name": "数字证书服务协议",
  "type": 4,
  "protocolContent": "<p style=\"text-align:center;text-indent:2em;\" size=\"2\" _root=\"[object Object]\" __ownerid=\"undefined\" __hash=\"undefined\" __altered=\"false\">数字证书服务协议</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">四川省数字证书认证管理中心有限公司（简称“四川CA”）是工业和信息化部批准的电子认证服务机构和国家密码管理局批准的电子政务电子认证服务机构，遵照《中华人民共和国电子签名法》为用户提供数字证书相关的电子认证服务。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">本协议中的“用户”指数字证书持有人以及申请使用数字证书的实体。数字证书（以下简称“证书”），是指包含数字证书使用者身份信息和公开密钥的电子文件。能够标识您的身份，用于网络系统登录身份认证及确保您使用数字证书进行签名的电子数据的真实性、完整性、机密性和抗抵赖性，四川CA将对您进行身份鉴证，当您通过身份鉴证后四川CA将为您签发数字证书。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">为明确各方权利和义务，四川CA和用户就数字证书的申请和使用等事项达成以下协议，双方共同遵守执行。本《数字证书服务协议》为钜信签平台《用户服务协议》的重要组成部分，用户点击同意即表示同意并认可本《数字证书服务协议》。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（一）用户知晓证书用于在网络上标识用户身份及电子签名，应按照业务系统的要求使用证书，不作其他任何用途。用户应正确使用证书，所有使用证书在网上作业中的活动均视为用户所为，用户对使用证书的行为负责，因此而产生的相关后果由用户自行承担。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（二）用户同意四川CA向有关部门和个人核实用户信息且四川CA有权合法收集、处理、传递和应用用户资料，并按照国家有关规定对用户资料保密。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（三）用户申请证书时应提供真实、完整、准确的资料和信息。如用户故意或过失提供不真实资料和信息而导致四川CA签发证书错误的，造成相关各方损失的，由用户承担因此所造成的相关责任和损失。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（四）非四川CA过错而导致签发数字证书延迟、中断或者无法签发的，四川CA不承担赔偿责任。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（五）用户提供的资料信息(如机构名称、统一社会信用代码、个人用户的姓名、身份证号等)在证书有效期内变更的，应当及时书面告知四川CA，并终止使用证书。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（六）证书一律不得转让、转借或转用。因转让、转借或转用而产生的相关后果应当由用户自行承担。如因用户原因致使证书私钥泄露、损毁或者丢失的，损失由用户自行承担。如证书私钥在证书有效期内泄露、损毁、丢失或可能泄露、损毁、丢失的，用户应及时向四川CA申请办理吊销手续。证书吊销申请受理后24小时内生效，期间用户自行承担使用数字证书造成的一切责任。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（七）用户应确保其应用系统能为证书提供安全的应用环境，若因网络、主机、操作系统或其他软硬件环境等存在安全漏洞，由此导致的安全事故及相关后果，四川CA不承担责任。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（八）用户终止使用证书时，应当立即申请吊销证书。证书吊销申请受理后24小时内生效，期间用户自行承担使用数字证书造成的一切责任。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（九）如果单位证书用户单位解散、注销或个人证书用户失去民事行为能力、死亡，法定责任人需要携带相关证明文件及原证书，向四川CA请求吊销用户证书。相关责任人应当承担其证书在吊销生效前相关行为所产生的责任。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（十）下列情形之一，四川CA有权吊销证书并不承担任何责任。由此给四川CA造成损失的，用户应当向四川CA承担赔偿责任：</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">1、提供的资料或信息不真实、不完整或不准确的；</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">2、证书相关信息有变更或证书私钥已经丢失或可能丢失，未终止使用该证书并通知四川CA的；</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">3、用户未履行本协议所规定的责任和义务；</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">4、法律、法规规定的其他情形。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（十一）证书在有效期届满后自动失效。</p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（十二）四川CA承诺，由于四川CA过错导致数字证书签发错误或证书私钥被破译并对用户造成损失的，四川CA按照电子认证业务规则（cps）承担相应<span style=\"color:#666666\">的赔偿责任。</span></p><p style=\"text-indent:2em;\" class=\"MsoNormal\">（十三）<span style=\"color:#666666\"><a>用户输入手机号、验证码并点击页面上的“  <u>登录</u> ”时起，本协议生效。</a>本协议生效后，四川CA及用户均</span>应依诚实守信之原则履行协议项之全部义务，若因本协议的履行、解释、赔偿所产生的一切争议，经双方协商不能解决，任何一方均可将争议提交四川CA所在地有管辖权的人民法院诉讼解决。</p><p> </p><p class=\"msocomoff\" align=\"left\" size=\"1\" width=\"33%\"></p>",
  "createTime": "1627381225000",
  "updateTime": "1627381225000",
  "status": 1,
  "parentId": "1419965843644887042"
}
				]
			};
		},
		methods:{
			changeFlag(){
				this.flag = !this.flag;
			},
			toNext(){
				this.$emit('toNext');
			},
			openPopup(name,type){
				if(name==='popupSubmitForm'){
					//认证提示对话框
					this.$refs[name].open('center');
				}else{
					//协议对话框
					this.protocolContent  = this.protocolContentList[type-2].protocolContent;
					this.$refs[name].open('center');
				}
				
			},
			submitForm(){
				this.$refs.popupSubmitForm.open('center')
			},
			closePopup(name){
				 this.$refs[name].close();
			},
			
		}
		,components:{
			FullLight
		}
	}
</script>

<style lang="scss">
.form{
	// padding: 15px 0 20px 0;
	.form-tip{
		text-align:left;
		color: $uni-text-color-grey;
		font-size:28rpx;
		margin-bottom:30rpx;
	}
	// .form-content{
    .uni-easyinput{
      overflow: hidden;
      color: red;
      text-overflow: clip;
    }
  // }
		/* .contract-form-title{
			line-height: 60rpx;
			border-left: 10rpx solid $uni-color-primary;
			padding-left: 30rpx;
			margin-bottom: 40rpx;
		} */
		.form-agree{
			color: $uni-text-color-disable;
			font-size: 28rpx!important;
			margin-bottom: 20rpx;
			.uni-icons{
				font-size: 15rpx;
				color: $uni-text-color-disable!important;
			}
			.contract-form-agree-icon{
				// color: $uni-color-primary!important;
			}
			.contract-form-agree-text{
				margin-left: 6rpx;
				line-height:1.5;
				// letter-spacing: -3rpx;
				.contract-form-agree-text-btn{
					color: $uni-color-primary;
					font-size: 28rpx;
				}
			}
		}
		.page-bottom-btn{
			@include bottomBtn($uni-color-primary,$uni-text-color-inverse);
		}
	/* 	.contract-popup{
			margin: 50rpx!important;
			width: 600rpx!important;
			.contract-popup-content{
				width: 600rpx!important;
				white-space: normal;
			}
			.contract-popup-btn{
				background-color: $uni-color-primary;
				color: $uni-text-color-inverse;
				padding: 0 100rpx;
			}
		} */
	}
	.popup-preread-btn {
		font-size: 12px;
	}
</style>
