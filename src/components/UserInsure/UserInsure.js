import { reactive, ref } from '@vue/reactivity'
import ButtonBasic from "../ButtonBasic/ButtonBasic.vue"
import { useToast } from "vue-toastification";

export default {
    components: {
        ButtonBasic
    },
    setup() {
        const stateView = ref("welcome")
        const user = reactive({
            name: '',
            age: 0,
            locationCode: 'HKD',
            location:'Hong Kong',
            packageCode: 'standard',
            package: '',
            premium: 0
        })

        const toast = useToast()

        const resetUser = () => {
            user.name = ''
            user.age = 0
            user.locationCode = 'HKD'
            user.location ='Hong Kong'
            user.packageCode = 'standard'
            user.package = ''
            user.premium = 0
        }

        const getLocation = () => {
            if (user.locationCode === 'HKD') user.location = 'Hong Kong'
            if (user.locationCode === 'USD') user.location = 'USA'
            if (user.locationCode === 'AUD') user.location = 'Australia'
        }

        const getPackage = () => {
            if (user.packageCode === 'standard') user.package = 'Standard'
            if (user.packageCode === 'safe') user.package = 'Safe'
            if (user.packageCode === 'supersafe') user.package = 'Super Safe'
        }
        
        const getRate = () => {
            if (user.locationCode === 'HKD') return 1
            if (user.locationCode === 'USD') return 2
            if (user.locationCode === 'AUD') return 3
            return 1
        }

        const getUserInsureData = () => {
            resetUser()
            stateView.value = 'register'
        }

        const getSummary = () => {
            if (user.age <= 0 || !user.name.trim().length) {
                toast.error("The Name is Empty or Invalid the Age", {
                    position: "bottom-right",
                    timeout: 2000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 1.72,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                })
                return
            }

            getLocation()
            getPackage()
            const rate = getRate()
            if (user.age > 0 && user.age <= 100) {
                user.premium = 10 * user.age * rate
                stateView.value = 'summary'
            } else if (user.age > 100) {
                stateView.value = 'error'
            }
        }

        return {
            user,
            stateView,
            getSummary,
            getLocation,
            getPackage,
            getRate,
            getUserInsureData
        }
    },
    computed: {
        syncPremium() {
            if (parseInt(this.user.age) !== 0) {
                return 10 * parseInt(this.user.age) * this.getRate()
            } else {
                return 0
            }
        }
    }
}