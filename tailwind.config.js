/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cores Expresso Nepomuceno
        "nepomuceno-dark-blue": "#1F295B",
        "nepomuceno-light-blue": "#3FB4E7",
        "nepomuceno-orange": "#F37021",
        "nepomuceno-gray": "#E6E7E8",
        // Cores neutras da escala de cinza
        "neutral-900": "#212529",
        "neutral-800": "#343A40",
        "neutral-700": "#495057",
        "neutral-600": "#6C757D",
        "neutral-500": "#ADB5BD",
        "neutral-400": "#CED4DA",
        "neutral-300": "#DEE2E6",
        "neutral-200": "#E9ECEF",
        "neutral-100": "#F8F9FA",
        // Cores primárias do cliente
        "primary-900": "#02040F",
        "primary-800": "#090B2A",
        "primary-700": "#121F4C",
        "primary-600": "#1D2F6E",
        "primary-500": "#1D2F99",
        "primary-400": "#3D51B9",
        "primary-300": "#6373D1",
        "primary-200": "#8B97E6",
        "primary-100": "#C0C7F9",
        // Cores de alerta
        "alert-green": "#22C55E",
        "alert-red": "#F40606",
        "alert-yellow": "#F4DD06",
        // Cores de status
        "status-green": "#046700",
        "status-red": "#B50202",
        "status-yellow": "#FFA500",
        "status-blue": "#12235B",
        "status-concluido": "#A2D2A0",
        "status-cancelado": "#DCBDBD",
        // Cor de fundo com opacidade
        overlay: "rgba(33, 37, 41, 0.4)",
      },
      fontFamily: {
        poppinsLight: "Poppins_300Light",
        poppinsRegular: "Poppins_400Regular",
        poppinsMedium: "Poppins_500Medium",
        poppinsSemibold: "Poppins_600SemiBold",
        poppinsBold: "Poppins_700Bold",
        poppinsExtrabold: "Poppins_800ExtraBold",
        poppinsBlack: "Poppins_900Black",
      },
    },
  },
  plugins: [],
};
