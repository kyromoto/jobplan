$(document).ready(() => {
    let app = new Vue({
        delimiters: ['[[', ']]'],
        el: '#job-edit-app',
        data: {
            title : null,
            location : null,
            date : null,
            info : null,
            staffs : []
        },
        methods : {
            handleAddStaff : function () {
                this.staffs.push({ id: "", name: ""});
            },
            handleRemoveStaff : function() {
                this.staffs.pop();
            }
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

    $('input.staff-autocomplete').autocomplete({
        data : {
            "1" : null,
            "2" : null,
            "3" : null
        }
    })


});