<template>
    <v-container>
        <v-row>
            <v-col>
                <v-container>
                    <v-row align="center" justify="center" class="mb-1">
                        <span class="text-h4 text-primary ma-2" style="font-family: 'Space Grotesk'">Gestión
                            Empresas</span>
                    </v-row>
                    <v-row class="ma-1">
                        <v-text-field label="Buscar empresa" variant="outlined"
                            prepend-inner-icon="mdi-magnify"></v-text-field>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row align="start" justify="start" class="ma-2">
                        <v-col cols="4" v-for="(empresa, index) in empresas" :key="index">
                            <v-card elevation="24">
                                <v-container>
                                    <v-row justify="start">
                                        <v-btn color="sidebar" icon variant="text"><v-icon>
                                                {{ empresa.favorito ? 'mdi-star' : 'mdi-star-outline' }}
                                            </v-icon></v-btn>
                                    </v-row>
                                    <v-card-title class="text-center text-primary">{{ empresa.nombre }}</v-card-title>
                                    <v-row justify="center" class="ma-2">
                                        <v-img max-width="128" src="/src/assets/icons/anadir-empresa-128px.png"
                                            contain></v-img>
                                    </v-row>
                                    <v-row justify="space-evenly">
                                        <v-dialog width="auto">
                                            <template v-slot:activator="{ props: activatorProps }">
                                                <v-btn color="sidebar" icon="mdi-card-account-details" variant="text"
                                                    v-bind="activatorProps"></v-btn>
                                            </template>
                                            <template v-slot:default="{ isActive }">
                                                <v-card color="sidebar">
                                                    <v-container>
                                                        <v-row class="my-3" justify="center">
                                                            <v-img max-width="128"
                                                                src="/src/assets/icons/anadir-empresa-128px.png"
                                                                contain></v-img>
                                                        </v-row>
                                                        <v-card class="my-3" elevation="9">
                                                            <v-card-title>{{ empresa.nombre }}</v-card-title>
                                                            <v-card-subtitle class="mb-2">NOMBRE O RAZÓN
                                                                SOCIAL</v-card-subtitle>
                                                        </v-card>
                                                        <v-card class="my-3" elevation="9">
                                                            <v-card-title>{{ empresa.direccion }}</v-card-title>
                                                            <v-card-subtitle class="mb-2">DIRECCIÓN PRINCIPAL (CASA
                                                                MATRIZ)</v-card-subtitle>
                                                        </v-card>
                                                        <v-card class="my-3" elevation="9">
                                                            <v-card-title>{{ empresa.rut }}</v-card-title>
                                                            <v-card-subtitle class="mb-2">RUT</v-card-subtitle>
                                                        </v-card>
                                                    </v-container>
                                                </v-card>
                                            </template>
                                        </v-dialog>
                                        <!-- <v-btn color="sidebar" icon="mdi-book-edit" variant="text"
                                            @click="gotoLedger(empresa)"></v-btn> -->
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>

    <v-fab class="fab" icon color="sidebar" size="x-large">
        <v-icon size="45px">mdi-plus</v-icon>
        <v-dialog activator="parent" max-width="600">
            <template v-slot:default="{ isActive }">
                <v-card color="sidebar">
                    <v-container>
                        <v-row align="center" class="mt-1 mb-3" justify="center">
                            <v-img max-width="52" src="/src/assets/icons/anadir-empresas-64px.png"></v-img>
                            <v-card-title class="text-h4 text-center white">Añadir nueva empresa</v-card-title>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col>
                                <v-text-field v-model="nombre" label="Nombre o razón social" variant="outlined"
                                    prepend-inner-icon="mdi-domain"></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field v-model="rut" hint="Ej.: 77888999-X" label="RUT Empresa"
                                    variant="outlined" prepend-inner-icon="mdi-card-account-details"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col>
                                <v-text-field v-model="direccion" hint="Ej.: Av. Libertador Bernardo O'Higgins #123"
                                    label="Dirección principal (casa matriz)" variant="outlined"
                                    prepend-inner-icon="mdi-map-marker"></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-autocomplete v-model="comuna" :items="itemsComunas" label="Seleccionar comuna"
                                    variant="outlined" prepend-inner-icon="mdi-city"></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col>
                                <v-autocomplete v-model="giros" :item-title="itemText" item-value="codigo" multiple
                                    chips closable-chips :items="girosOrdenados" label="Seleccionar giro(s)"
                                    variant="outlined" prepend-inner-icon="mdi-tag-multiple"
                                    hint="Seleccione uno o varios giros"></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row class="mr-3 mb-1" justify="end">
                            <v-btn color="white" prepend-icon="mdi-content-save-move" variant="outlined"
                                @click="crearEmpresa">Guardar</v-btn>
                        </v-row>
                    </v-container>
                </v-card>
            </template>
        </v-dialog>
    </v-fab>
</template>

<script>
import axios from 'axios';
import { obtenerToken } from '../utils/obtenerToken';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export default {
    data() {
        return {
            nombre: '',
            rut: '',
            direccion: '',
            giros: [],     // Será un array para almacenar múltiples giros
            mensaje: '',   // Opcional: para mostrar mensajes de éxito o error
            itemsComunas: [
                'Rancagua'
            ],
            itemsGiros: [],
            empresas: []
        };
    },
    async created() {
        await this.cargarGiros();
        await this.cargarEmpresas();
    },
    methods: {
        itemText(item) {
            return `${item.codigo} - ${item.actividad}`;
        },
        async cargarGiros() {
            try {
                const querySnapshot = await getDocs(collection(db, "giros"));
                this.itemsGiros = querySnapshot.docs.map(doc => doc.data());
            } catch (error) {
                console.error("Error cargando giros:", error);
            }

            console.log(this.itemsGiros);
        },
        async cargarEmpresas() {
            try {
                const token = await obtenerToken();
                const response = await axios.get('http://localhost:3000/api/empresas/listar', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.empresas = response.data.empresas;
            } catch (error) {
                console.error("Error al cargar empresas:", error);
            }
        },
        async crearEmpresa() {
            try {
                // Prepara el objeto de datos
                const payload = {
                    nombre: this.nombre,
                    rut: this.rut,
                    direccion: this.direccion,
                    giro: this.giros
                };
                const token = await obtenerToken();
                const response = await axios.post('http://localhost:3000/api/empresas/crear', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                this.mensaje = response.data.message;
                console.log('Empresa creada:', response.data.empresa);

                // Limpia el formulario y cierra el diálogo
                this.nombre = '';
                this.rut = '';
                this.direccion = '';
                this.giros = [];
            } catch (error) {
                console.error("Error al crear la empresa:", error);
                this.mensaje = error.response?.data?.error || "Error al crear la empresa";
            }
        },
        slugify(name) {
            return name.toLowerCase().replace(/\s+/g, '').replace(/[^\w\-]+/g, '');
        },
        irAlPerfilEmpresa(empresa) {
            const slug = this.slugify(empresa.nombre);
            this.$router.push({ name: 'BusinessProfile', params: { slug } });
        },
        gotoLedger(empresa) {
            const slug = this.slugify(empresa.nombre);
            this.$router.push({ name: 'Ledger', params: { slug } });
        },
    },
    computed: {
        girosOrdenados() {
            return this.itemsGiros.slice().sort((a, b) => {
                return Number(a.codigo) - Number(b.codigo);
            });
        }
    }
};
</script>


<style scoped>
.fill-height {
    height: 100vh;
}

.fab {
    position: fixed;
    bottom: 32px;
    right: 32px;
}
</style>