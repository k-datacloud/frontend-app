<template>
    <v-app>
        <Header></Header>
        <v-main>
            <v-container>
                <v-row class="mt-16 align-center">
                    <v-col>
                        <v-img src="@/assets/1443.png" alt="人物"></v-img>
                    </v-col>
                    <v-col>
                        <h2 class="mv__title">あなたの経験が<br>
                            誰かのキャリアを築きます
                        </h2>
                        <ul class="mv-menu">
                            <li class="mv-menu__item">自分が成功したこと</li>
                            <li class="mv-menu__item">失敗から学んだこと</li>
                            <li class="mv-menu__item">自分のキャリア</li>
                            <li class="mv-menu__item">スキルの身に着け方、学習方法</li>
                        </ul>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import Header from '@/components/Header.vue';

export default {
    name: 'StartView',
    components: {
        Header
    }
}
</script>

<style scoped lang="scss">

.custom-app-bar {
    background-color: #fff;
    padding: 10px 40px;
    box-shadow: none;

    &__title {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
    }
}

.custom-btn {
    background-color: #E8D575;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
}

.mv__title {
    font-size: 30px;
    font-weight: bold;
    color: #333333;
    text-align: center;
    border-bottom: 4px solid #E8D575;
    line-height: 1.8;
    margin-bottom: 60px;
}

.mv-menu {
    list-style: none;
    padding: 0;
    margin: 0;


    &__item {
        font-size: 20px;
        margin-bottom: 12px;
        color: #333333;
        font-weight: bold;
        letter-spacing: .1px;
    }
}
</style>