<template>
    <v-container>
        <v-row align="center" justify="start">
            <v-col cols="auto">
                <v-img width="64" max-height="64" src="/src/assets/contabilidad.png" contain></v-img>
            </v-col>
            <v-col>
                <span class="text-h3 font-weight-bold text-primary" style="font-family: 'Space Grotesk'">Software
                    Contable</span>
            </v-col>
        </v-row>

        <v-row class="mt-12" justify="space-around">
            <v-col cols="7">
                <v-row>
                    <span class="text-h4 font-weight-bold text-primary"
                        style="font-family: 'Space Grotesk'">Acceso</span>
                </v-row>
                <v-row class="mt-6">
                    <span class="text-h6 font-stretch-100% text-primary" style="font-family: 'Inter'">Inicia sesión
                        para
                        continuar</span>
                </v-row>
            </v-col>
            <v-col cols="5">
                <v-card color="card" class="pa-6" elevation="12">
                    <v-card-title class="text-h4 font-weight-bold text-center text-primary">Iniciar
                        sesión</v-card-title>

                    <v-card-text>
                        <!-- Campo de Email -->
                        <v-text-field @input="validateForm" label="Correo electrónico" v-model="email"
                            :rules="emailRules" required clearable variant="outlined" class="mt-3" />

                        <!-- Campo de Contraseña -->
                        <v-text-field @input="validateForm" label="Contraseña" v-model="password" :rules="passwordRules"
                            required clearable variant="outlined" :type="showPassword ? 'text' : 'password'"
                            @click:append-inner="showPassword = !showPassword"
                            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" class="mt-3" />

                        <v-alert v-if="mensaje" type="warning" class="mt-4" dismissible>
                            {{ mensaje }}
                        </v-alert>

                        <!-- Botón de Login -->
                        <v-btn :disabled="!isValid" block color="buttonprimary" class="mt-4" @click="iniciarSesion">
                            Iniciar sesión
                        </v-btn>
                    </v-card-text>

                    <v-card-actions class="justify-center">
                        <v-btn variant="text" color="buttonprimary" @click="gotoCreateAccount">Registrate</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn variant="text" color="buttonprimary" @click="gotoForgotPassword">¿Olvidaste tu
                            contraseña?</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="2000" color="success" top>
        {{ snackbarMessage }}
    </v-snackbar>
</template>

<script>
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

console.log("Auth Object:", auth);

export default {
    data() {
        return {
            email: '',
            password: '',
            showPassword: false,
            isValid: false,
            emailRules: [
                v => !!v || 'El correo es obligatorio',
                v => /.+@.+\..+/.test(v) || 'Debe ser un correo válido'
            ],
            passwordRules: [
                v => !!v || 'La contraseña es obligatoria',
                v => v.length >= 6 || 'Mínimo 6 caracteres'
            ],
            mensaje: '',
            snackbar: false,
            snackbarMessage: ''
        };
    },
    methods: {
        validateForm() {
            this.isValid = this.email.trim() !== '' && this.password.trim() !== '';
        },
        gotoCreateAccount() {
            this.$router.push('/create-account');
        },
        gotoForgotPassword() {
            this.$router.push('/forgot-password');
        },
        async iniciarSesion() {
            try {
                // Inicia sesión con email y contraseña
                const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
                const user = userCredential.user;
                console.log("Usuario autenticado:", user);

                // Verifica si el correo ha sido confirmado
                if (!user.emailVerified) {
                    // Envía el correo de verificación si aún no se ha enviado
                    await sendEmailVerification(user);
                    this.mensaje = "Se ha enviado un correo de verificación a tu cuenta. Por favor, revisa tu email.";
                    return;
                } else {
                    // Si el correo ya está verificado, permite el acceso
                    this.snackbarMessage = "Inicio de sesión exitoso. ¡Bienvenido!";
                    this.snackbar = true;
                    setTimeout(() => {
                        this.$router.push('/mainmenu');// Aquí puedes redirigir al usuario a la sección protegida de la aplicación
                    }, 2000);
                }
            } catch (error) {
                console.error("Error en el inicio de sesión:", error);
                this.mensaje = error.message;
            }
        }
    }
}
</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>