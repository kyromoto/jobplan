$(document).ready(() => {
    let app = new Vue({
        delimiters: ['[[', ']]'],
        el: '#job-edit-app',
        data: {
            title : null,
            location : null,
            date : null,
            info : null,
            staff : []
        },
        methods : {

        },
        beforeMount() {
            if(typeof hbsJob != 'undefined') {
                let keys = Object.keys(hbsJob);

                keys.forEach(key => {
                    console.log("load " + key);                    
                    this[key] = hbsJob[key];
                });
            }
        }
    });


});