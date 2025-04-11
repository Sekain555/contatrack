<template>
    <v-main>
        <router-view />
    </v-main>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-tabs align-tabs="center">
                        <v-tab :value="1">Ventas</v-tab>
                        <v-tab :value="2">N. Crédito Ventas</v-tab>
                        <v-tab :value="3">Compras</v-tab>
                        <v-tab :value="4">N. Crédito Compras</v-tab>
                        <v-tab :value="5">Impuesto Específico Negativo</v-tab>
                    </v-tabs>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>