<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isLogin = ref(true);
const isLoading = ref(false);
const errorMessage = ref("");
const generatedUsername = ref("");

const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const resetForm = () => {
  errorMessage.value = "";
  password.value = "";
  confirmPassword.value = "";
  if (!isLogin.value) username.value = "";
};

const goToLoginWithGeneratedName = () => {
  isLogin.value = true;
  password.value = "";
  generatedUsername.value = "";
};

const handleSubmit = async () => {
  if (!isLogin.value && password.value !== confirmPassword.value) {
    errorMessage.value = "The passwords don't match!";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  const endpoint = isLogin.value ? "/api/auth/login" : "/api/auth/register";
  const apiUrl = `http://localhost:3000${endpoint}`;

  const payload = isLogin.value
    ? { username: username.value, password: password.value }
    : { password: password.value };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Internal error");
    }

    if (isLogin.value) {
      localStorage.setItem("lura_token", data.token);
      localStorage.setItem("lura_username", data.user.username);

      router.push("/");
    } else {
      generatedUsername.value = data.user.username;
      username.value = data.user.username;
    }
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="auth-header">
        <h2 :class="{ active: isLogin }" @click="isLogin = true">Belépés</h2>
        <h2 :class="{ active: !isLogin }" @click="isLogin = false">
          Csatlakozás
        </h2>
      </div>

      <div v-if="generatedUsername" class="success-screen">
        <h3>Welcome to lura.</h3>
        <p class="warning-text">
          This is your generated username:
          <strong>Please write it down in a secure place!</strong> If you forget
          your log in credentials you can't recover your account!
        </p>
        <div class="generated-name-box">
          {{ generatedUsername }}
        </div>
        <button class="primary-btn" @click="goToLoginWithGeneratedName">
          Go To Login
        </button>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="isLogin" class="input-group">
          <label>Secret username</label>
          <input
            type="text"
            v-model="username"
            placeholder="ex. SilentFox891"
            required
          />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="At least 6 characters"
            required
            minlength="6"
          />
        </div>

        <div v-if="!isLogin" class="input-group">
          <label>Confirm password</label>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Please write your password again!"
            required
          />
        </div>

        <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>

        <button type="submit" class="primary-btn" :disabled="isLoading">
          {{ isLoading ? "Loading..." : isLogin ? "Login" : "Signup" }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.auth-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.auth-header {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  border-bottom: 2px solid var(--border-color, #eaeaea);
}

.auth-header h2 {
  font-size: 1.2rem;
  color: #888;
  cursor: pointer;
  padding-bottom: 10px;
  transition: all 0.3s ease;
  user-select: none;
}

.auth-header h2.active {
  color: var(--text-main, #222);
  border-bottom: 2px solid var(--text-main, #222);
  margin-bottom: -2px; /* Rálóg az alsó vonalra */
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
}

.input-group input {
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.input-group input:focus {
  border-color: #555;
}

.primary-btn {
  background: var(--text-main, #222);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 10px;
}

.primary-btn:hover:not(:disabled) {
  opacity: 0.8;
}

.primary-btn:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.error-msg {
  color: #d9534f;
  font-size: 0.9rem;
  text-align: center;
}

.success-screen {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.warning-text {
  color: #d9534f;
  font-size: 0.9rem;
  line-height: 1.4;
}

.generated-name-box {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: #222;
  border: 2px dashed #ccc;
}
</style>
