<template>
    <v-card elevation="9" color="sidebar">
        <v-row align="center" justify="space-around" class="ma-2">
            <v-col cols="3">
                <v-row justify="space-around">
                    <v-img max-width="128" src="/src/assets/icons/anadir-empresa-128px.png"></v-img>
                </v-row>
            </v-col>
            <v-col cols="3">
                <v-row align="center" justify="space-around" class="mx-2 mb-2">
                    <span class="text-h5 font-weight-bold white" style="font-family: 'Space Grotesk'">Nombre
                        Empresa</span>
                </v-row>
                <v-row align="center" justify="space-around" class="mx-2 mb-2">
                    <v-icon color="white" height="24" icon="mdi-card-account-details"></v-icon>
                    <span class="text-body-1 font-stretch-100% white" style="font-family: 'Inter'">76.000.000-K</span>
                </v-row>
                <v-row align="center" justify="space-around" class="mx-2 mt-2">
                    <v-icon color="white" height="24" icon="mdi-map-marker"></v-icon>
                    <span class="text-body-1 font-stretch-100% white" style="font-family: 'Inter'">76.000.000-K</span>
                </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="3">
                <v-row align="center" justify="space-around" class="mx-2 mb-2">
                    <span class="text-h5 font-weight-bold white" style="font-family: 'Space Grotesk'">Contacto</span>
                </v-row>
                <v-row align="center" justify="space-around" class="mx-2 mb-2">
                    <v-icon color="white" height="24" icon="mdi-email"></v-icon>
                    <span class="text-body-1 font-stretch-100% white"
                        style="font-family: 'Inter'">correo@electronico.cl</span>
                </v-row>
                <v-row align="center" justify="space-around" class="mx-2 mt-2">
                    <v-icon color="white" height="24" icon="mdi-phone"></v-icon>
                    <span class="text-body-1 font-stretch-100% white" style="font-family: 'Inter'">76.000.000-K</span>
                </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="3">
                <v-row align="center" justify="space-around" class="mx-2 mb-2">
                    <span class="text-h5 font-weight-bold white" style="font-family: 'Space Grotesk'">Giros</span>
                </v-row>
                <v-row align="center" justify="space-around" class="mx-2 mb-2">
                    <v-chip v-for="(g, i) in visibles" :key="g.codigo" small class="ma-1" color="white"
                        text-color="sidebar">
                        {{ g.actividad }}
                    </v-chip>

                    <!-- Chip “+N más” -->
                    <v-chip v-if="extras.length" small class="ma-1" color="white" text-color="sidebar"
                        @mouseenter="tooltip = true" @mouseleave="tooltip = false">
                        +{{ extras.length }} más
                        <v-tooltip v-model="tooltip" open-delay="200">
                            <template #activator="{ props }">
                                <!-- activator es el mismo chip -->
                                <span v-bind="props"></span>
                            </template>
                            <div class="pa-2" style="max-width: 200px;">
                                <v-chip v-for="g in extras" :key="g.codigo" small class="ma-1" color="white"
                                    text-color="sidebar">
                                    {{ g.actividad }}
                                </v-chip>
                            </div>
                        </v-tooltip>
                    </v-chip>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import axios from 'axios';
import { obtenerToken } from '../utils/obtenerToken';

export default {
    data() {
        return {
            datosBasicos: null,
            tooltip: false,
        };
    },
    async created() {
        const id = this.$route.params.id;
        await this.cargarDatosBasicosEmpresa(id);
    },
    computed: {
        visibles() {
            return this.datosBasicos?.giros.slice(0, 1) || [];
        },
        extras() {
            return this.datosBasicos?.giros.slice(1) || [];
        },
    },
    methods: {
        async cargarDatosBasicosEmpresa(id) {
            try {
                const token = await obtenerToken();
                const { data } = await axios.get(
                    `http://localhost:3000/api/empresas/datos-basicos/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                this.datosBasicos = data.datosBasicos;
            } catch (error) {
                console.error("Error al cargar datos básicos:", error);
            }
        },
    },
}
</script>

<style scoped>
.v-chip {
    font-size: 0.75rem;
    font-family: 'Inter', sans-serif;
}
</style>