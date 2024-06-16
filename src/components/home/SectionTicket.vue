<script setup>
import HCompSectionTitle from './HCompSectionTitle.vue';
import HCompLearnMoreBtn from './HCompLearnMoreBtn.vue';
</script>

<template>
    <div class="section">
        <HCompSectionTitle title="熱門票券" />
        <div class="container">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                <div class="TK_card col" v-for="ticket in popularTickets" :key="ticket.id" @click="goToDetail(ticket.id)">
                    <div class="ticket_Card">
                        <div class="ticket-img">
                            <img :src="ticket.image" :alt="ticket.name" />
                        </div>
                        <div class="Ticket_Txt">
                            <h4>{{ ticket.name }}</h4>
                            <p>{{ ticket.content }}</p>
                            <span class="TicketPrice">{{ ticket.price }}</span>
                            <p>{{ ticket.viewers }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <HCompLearnMoreBtn  link="/tickets" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            tickets: [],
        };
    },
    computed: {
        popularTickets() {
            return this.tickets.filter(ticket => [4, 5, 1].includes(ticket.id));
        }
    },
    mounted() {
        this.loadJsonData();
    },
    methods: {
        loadJsonData() {
        fetch('/json/tickets.json')
            .then(response => response.json())
            .then(data => {
                this.tickets = data.tickets;
            })
            .catch(error => {
                console.error('Error loading JSON data:', error);
            });
        },
        goToDetail(id){
            this.$router.push({ name: 'TicketInner', params: { id } });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

    .ticket_Card{
        margin: 5% 0px;
        .ticket-img img{
            width: 80%;
            border-radius: 80px;
            cursor: pointer;
            transform: translate(0, -10%);
            transition: scale .5s ease-in-out;
            &:hover{
                scale: 1.05;
                transition: scale .5s ease-in-out;
            }
        }
        .Ticket_Txt{
            padding: 5% 10%;
            color: $black;
            cursor: pointer;
            .TicketPrice{
                background-color: $accentColor-2;
            }
        }
    }
</style>
