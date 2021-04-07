<template>
    <v-container class="d-flex flex-column justify-center align-center" fluid style="padding-left: 0;padding-right: 0;height: 200px">
        <v-hover v-slot="{ hover }">
            <v-card @click="dayBatch" tile class="d-flex flex-row justify-center align-center" style="cursor: pointer" color="grey lighten-4" width="150" height="60">
                <div class="title font-weight-bold" style="color: #2E7D32">
                    日 终 批 量
                </div>
                <v-expand-transition>
                    <div v-if="hover" class="d-flex transition-fast-in-fast-out green darken-1 v-card--reveal display-2 white--text" style="height: 100%;">
                        $$
                    </div>
                </v-expand-transition>
            </v-card>
        </v-hover>

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
            //Todo 日终批量处理
            dayBatch () {
                this.progress = true;
                this.$notify({
                    title: '批量处理失败，请重试',
                    type: 'error'
                });
            },
        },
        watch: {
            progress: function (val) {
                if (val) {
                    setTimeout(() => (this.progress = false), 2000)
                }
            }
        },
        data () {
            return {
                progress: false
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
