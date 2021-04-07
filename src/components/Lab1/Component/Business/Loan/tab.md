        <v-card style="width: 100%" class="mt-5 elevation-0">
            <v-tabs color="green darken-2">
                <v-tab><v-badge color="green" content="6">
                    已还款账单
                </v-badge></v-tab>

                <v-tab><v-badge color="green" dot>
                    当前待还账单
                </v-badge></v-tab>

                <v-tab><v-badge color="green" content="6">
                    逾期未还账单
                </v-badge></v-tab>

                <v-tab><v-badge color="green" content="6">
                    未还账单（还款计划）
                </v-badge></v-tab>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            {{ loanDetail.jjh }}
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            2
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            3
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            4
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
