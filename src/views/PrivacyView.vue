<template>
    <v-app>
        <Header></Header>
        <v-main>
        <v-container>
            <v-row class="mt-16 mb-16">
                <v-card width="800" class="mx-auto" elevation="0">
                    <v-card-title>アプリ開発の経緯とお願い</v-card-title>
                    <v-card-text>当サービスでは、様々な経験を投稿していただくことで、多くの人々がそれを参考にし、共感し、学び合える場を提供出来ると思い、サービスを立ち上げました。しかし、このプラットフォームは共有と学び合いのためのものであり、迷惑なコンテンツや不適切な情報を含む投稿はご遠慮ください。</v-card-text>
                    <v-card-title>お問い合わせ</v-card-title>
                    <v-card-text>アプリの不具合や使い方、その他改善点などあればkaiseekerdg@gmail.comまでお問い合わせください。</v-card-text>
                </v-card>
                <v-card width="800" class="mx-auto" elevation="0">
                    <v-card-title>プライバシーポリシー</v-card-title>
                    <v-card-text>https://yasashi.k-notebook.com(以下当サイトとします。)における個人情報や各種サービスの取り扱いについて、以下のとおりにプライバシーポリシーを定めます。</v-card-text>
                    <v-card-title>個人情報の利用目的</v-card-title>
                    <v-card-text>当サイトでは、メールでのお問い合わせの際、名前やメールアドレス等の個人情報をご登録いただく場合がございます。これらの個人情報は質問に対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。</v-card-text>
                    <v-card-title>個人情報の第三者への開示について</v-card-title>
                    <v-card-text>当サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。・本人のご了解がある場合・法令等への協力のため、開示が必要となる場合</v-card-text>
                    <v-card-title>Cookieの使用について</v-card-title>
                    <v-card-text>当サイトでは、広告配信やアクセス解析のためにCookieを使用していますCookieによりブラウザを識別していますが、特定の個人の識別はできない状態で匿名性が保たれています。Cookieの使用を望まない場合、ブラウザからCookieを無効に設定できます。</v-card-text>
                    <v-card-title>免責事項について</v-card-title>
                    <v-card-text>当サイトは、掲載内容によって生じた損害に対する一切の責任を負いません。各コンテンツでは、できる限り正確な情報提供を心がけておりますが、正確性や安全性を保証するものではありません。また、リンク先の他サイトで提供される情報・サービスについても、責任を負いかねますのでご了承ください。</v-card-text>
                    <v-card-title>著作権について</v-card-title>
                    <v-card-text>当サイトの著作権は放棄しておりません。当サイト記事からの引用に関しましては「引用元の明示」によって無償で引用頂けます。ただし、全文転載はお断りいたしております。引用許可範囲についても、事前予告なくこれを変更する事があります。また、当サイトのRSSを利用し、コンテンツをそのまま盗用することも禁止しています。</v-card-text>
                    <v-card-title>プライバシーポリシーの変更について</v-card-title>
                    <v-card-text>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直して改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。</v-card-text>
                </v-card>
            </v-row>
        </v-container>
    </v-main>
    </v-app>
</template>

<script>

import Header from '@/components/Header.vue';

export default {
    name: 'PrivacyView',
    components: {
        Header
    }
}

</script>

<style scoped lang="scss">

.v-card-title {
    font-weight: bold;

}
</style>