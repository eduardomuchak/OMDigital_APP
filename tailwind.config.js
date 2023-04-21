/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cores neutras da escala de cinza
        'neutral-900': '#212529',
        'neutral-800': '#343A40',
        'neutral-700': '#495057',
        'neutral-600': '#6C757D',
        'neutral-500': '#ADB5BD',
        'neutral-400': '#CED4DA',
        'neutral-300': '#DEE2E6',
        'neutral-200': '#E9ECEF',
        'neutral-100': '#F8F9FA',
        // Cores primárias do cliente
        'primary-900': '#020A33',
        'primary-800': '#0C1A66',
        'primary-700': '#1D2F99',
        'primary-600': '#354ACB',
        'primary-500': '#556AEB',
        'primary-400': '#6E82FE',
        'primary-300': '#8FA0FF',
        'primary-200': '#B9C4FF',
        'primary-100': '#EBEFFF',
        // Cores de alerta
        'alert-green': '#22C55E',
        'alert-red': '#F40606',
        'alert-yellow': '#F4DD06',
        // Cores de status
        'status-green': '#046700',
        'status-red': '#B50202',
        'status-yellow': '#FFA500',
        'status-blue': '#12235B',

        //Cores de status concluído e cancelado
        statusConcluido: 'rgba(4, 103, 0, 0.2)',
        statusCancelado: 'rgba(181, 2, 2, 0.2)',

        // Cor de fundo com opacidade
        overlay: 'rgba(33, 37, 41, 0.4)',
      },
      fontFamily: {
        poppinsLight: 'Poppins_300Light',
        poppinsRegular: 'Poppins_400Regular',
        poppinsMedium: 'Poppins_500Medium',
        poppinsSemibold: 'Poppins_600SemiBold',
        poppinsBold: 'Poppins_700Bold',
        poppinsExtrabold: 'Poppins_800ExtraBold',
        poppinsBlack: 'Poppins_900Black',
      },
    },
  },
  plugins: [],
};
