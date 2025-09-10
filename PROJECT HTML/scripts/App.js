document.addEventListener("DOMContentLoaded", function () {
  // Validación registro
  const formRegistro = document.getElementById("registre_login");
  if (formRegistro) {
    formRegistro.addEventListener("submit", function (e) {
      e.preventDefault();
      // Obtener valores
      const usuario = document.getElementById("newUsuario").value.trim();
      const contrasena = document.getElementById("newContraseña").value.trim();
      const email = document.getElementById("email").value.trim();
      // Validar campos vacíos
      if (!usuario || !contrasena || !email) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      // Si todo está bien, redirigir
      window.location.href = "login.html";
    });
  }

  // Validación login
  const emailLogin = document.getElementById("email");
  const passwordLogin = document.getElementById("password");
  if (emailLogin && passwordLogin && !formRegistro) {
    const loginButton = document.querySelector('button[type="submit"]');
    if (loginButton) {
      loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        const emailValue = emailLogin.value.trim();
        const passwordValue = passwordLogin.value.trim();
        if (!emailValue || !passwordValue) {
          alert("Por favor, completa todos los campos.");
          return;
        }
        // Guardar email para usar el rol en otras páginas
        localStorage.setItem("email", emailValue);
        // Redirigir a la página principal después de login
        window.location.href = "index.html";
      });
    }
  }

  //===========================VISTA ADMIN======================================================
  // Mostrar panel admin en index.html si corresponde
  const adminPanelIndex = document.getElementById("adminPanelIndex");
  const email = localStorage.getItem("email");
  if (
    adminPanelIndex &&
    (window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html")
  ) {
    if (email && email.endsWith("@levelup.cl")) {
      adminPanelIndex.style.display = "block";
    } else {
      adminPanelIndex.style.display = "none";
    }
  }

  // Lógica para adminview.html: mostrar panel y botón cerrar sesión solo a admin
  if (window.location.pathname.endsWith("adminview.html")) {
    if (!email || !email.endsWith("@levelup.cl")) {
      window.location.href = "index.html";
      return;
    }
    const adminPanel = document.getElementById("adminPanelIndex");
    if (adminPanel) adminPanel.style.display = "block";
    // Botón cerrar sesión
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("email");
        window.location.href = "login.html";
      });
    }
  }
  // Redirección automática y enlace admin en index.html
  const nav = document.getElementById("mainNav");
  if (email && email.endsWith("@levelup.cl")) {
    // Redirigir automáticamente a adminview.html si está en index.html
    if (
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      window.location.href = "adminview.html";
      return;
    }
  }

  //=============================VISTA USUARIO DUOC================================
  if (email && email.endsWith("@duocuc.cl")) {
    // Redirigir automáticamente a duocview.html si está en index.html
    if (
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      window.location.href = "duocview.html";
      return;
    }
  }
  if (window.location.pathname.endsWith("duocview.html")) {
    if (!email || !email.endsWith("@duocuc.cl")) {
      window.location.href = "index.html";
      return;
    }
    const userPanel = document.getElementById("userPanel");
    if (userPanel) userPanel.style.display = "block";
    // Botón cerrar sesión
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("email");
        window.location.href = "login.html";
      });
    }
  }
});
