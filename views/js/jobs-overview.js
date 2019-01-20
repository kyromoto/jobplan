$(document).ready(() => {
    let app = new Vue({
        delimiters: ['[[', ']]'],
        el: '#job-overview-app',
        data: {
            jobs: hbsJobs,
            modalDeleteJob: {
                job: null
            },
            newJob : {
                title : null,
                date : null
            }
        },
        filters: {
            moment: function (date) {
                return moment(date).locale('de').format('LL');
            }
        },
        methods: {
            openModalDeleteJob: function (job) {                
                this.modalDeleteJob.job = job;
                $('#modal-delete-job-name').text(this.modalDeleteJob.job.title);
                $('#modal-delete-job').modal('open');
            },
            closeModalDeleteJob: function () {
                this.modalDeleteJob.job = null;
                $('#modal-delete-job').modal('close');
            },
            modalDeleteJobAgree: function () {
                let self = this;
                $.ajax({
                    url: '/jobs/' + this.modalDeleteJob.job._id,
                    type: 'DELETE',
                    success: function(res) {
                        location.reload();
                    },
                    error: function(err) {
                        console.console.error(err);
                    }
                });
            },
            deleteJob: function (jobId) {
                this.jobs.filter(function (job) {
                    if (job._id == jobId) {
                        openModalDeleteJob(job);
                        return;
                    }
                })
            },
            handleNewJobSubmit: function () {
                $.ajax({
                    url: '/jobs',
                    type: 'POST',
                    data : this.newJob,
                    success: function(res) {
                        location.reload();
                    },
                    error: function(err) {
                        console.error(err);
                    }
                })
            }

        }
    });

    let i18n = 'de';

    moment.locale(i18n);
    let months = moment.months();
    let monthsShort = moment.monthsShort();

    $('#modal-delete-job').modal();
    $('#job-list').collapsible();
    $('#newJob-date').attr('min', moment().format('YYYY-MM-DD'));
});