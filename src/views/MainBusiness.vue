<template>
    <v-container>
        <v-row>
            <v-main>
                <router-view />
            </v-main>
        </v-row>
        <v-row>
            <v-col>
                <v-card color="card" elevation="12">
                    <v-container>
                        <v-row align="center" justify="center" class="mb-1">
                            <span class="text-h4 text-primary ma-2" style="font-family: 'Space Grotesk'">Menú
                                Contabilidad</span>
                        </v-row>
                        <v-divider></v-divider>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>