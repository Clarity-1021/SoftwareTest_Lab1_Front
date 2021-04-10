<template>
    <v-container class="d-flex flex-column justify-center align-center" fluid style="padding-left: 0;padding-right: 0;height: 500px">
        <v-hover v-slot="{ hover }">
            <v-card @click="dayBatch" tile class="d-flex flex-row justify-center align-center" style="cursor: pointer" color="grey lighten-4" width="80%" height="60">
                <div class="title font-weight-bold" style="color: #2E7D32">
                    日 终 批 量
                </div>
                <v-expand-transition>
                    <div v-if="hover" class="d-flex transition-fast-in-fast-out green darken-1 v-card--reveal display-2 white--text" style="height: 100%;">
                        ￥￥￥
                    </div>
                </v-expand-transition>
            </v-card>
        </v-hover>
<!--        <v-card-->
<!--                class="mx-auto text-center"-->
<!--                color="green"-->
<!--                dark-->
<!--                width="100%"-->
<!--        >-->
<!--            <v-card-text>-->
<!--                <v-sheet color="rgba(0, 0, 0, .12)">-->
<!--                    <v-sparkline-->
<!--                            :value="value"-->
<!--                            color="rgba(255, 255, 255, .7)"-->
<!--                            height="100"-->
<!--                            padding="24"-->
<!--                            stroke-linecap="round"-->
<!--                            smooth-->
<!--                    >-->
<!--                        <template v-slot:label="item">-->
<!--                            ￥{{ item.value }}-->
<!--                        </template>-->
<!--                    </v-sparkline>-->
<!--                </v-sheet>-->
<!--            </v-card-text>-->
<!--            <v-divider></v-divider>-->

<!--            <v-card-text>-->
<!--                <div class="display-1 font-weight-thin">-->
<!--                    Sales Last 24h-->
<!--                </div>-->
<!--            </v-card-text>-->


<!--        </v-card>-->

        <!--日终批量等待条-->
        <v-dialog v-model="progress" hide-overlay persistent width="300">
            <v-card color="green darken-1" dark>
                <v-card-text>
                    正在提批量处理，请稍等
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>



    </v-container>
</template>

<script>
    export default {
        name: "LoanClearing",
        methods: {
            // 日终批量处理
            dayBatch () {
                this.progress = true;
                this.$axios.post(
                    '/loan/bill',
                    {},
                    { params:{} }
                )
                    .then(resp => {
                        if (resp.data.code === "200") {
                            this.$message({
                                showClose: true,
                                message: '批量处理成功',
                                type: 'success'
                            });
                        }
                        else {
                            this.$notify({
                                title: '批量处理失败，请重试',
                                type: 'error'
                            });
                        }
                        this.progress = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });

            },
        },
        watch: {
            // progress: function (val) {
            //     if (val) {
            //         setTimeout(() => (this.progress = false), 2000)
            //     }
            // }
        },
        data () {
            return {
                progress: false,
                value: [
                    423,
                    446,
                    675,
                    510,
                    590,
                    610,
                    760,
                ],
            }
        },
    }
</script>

<style scoped>
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        position: absolute;
        width: 100%;
        cursor: pointer;
    }
</style>
