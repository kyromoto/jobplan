$(document).ready(() => {
    let app = new Vue({
        delimiters: ['[[', ']]'],
        el: '#job-overview-app',
        data: {
            jobs: hbsJobs,
            modalDeleteJob: {
                job: null
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
                    success: function(result) {
                        location.reload();
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
            }

        }
    });

    $('#modal-delete-job').modal();
    $('#job-list').collapsible();
});