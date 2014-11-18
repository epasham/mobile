/**
 * ******************************************************************************************************
 *   Require JS
 * ******************************************************************************************************
 */

require({
    // Require Config
    //baseUrl: '/rjs',
    ///enforceDefine: true,
    paths: { },
    shim: {
        'app/app'                                   : { deps: ['app/common/stemServer','app/common/analytics'] },

        'app/services'                              : { deps: ['app/app'] },
        'app/services/userService'                  : { deps: ['app/services'] },
        'app/services/securityService'              : { deps: ['app/services'] },
        'app/services/dataGrid'                     : { deps: ['app/services'] },
        'app/services/loadingService'               : { deps: ['app/services'] },
        'app/services/emailService'                 : { deps: ['app/services'] },
        'app/services/parentStudentRelService'      : { deps: ['app/services'] },
        'app/services/dropdownValueService'         : { deps: ['app/services'] },
        'app/services/invitationService'            : { deps: ['app/services'] },
        'app/services/studentEventsService'         : { deps: ['app/services'] },
        'app/services/organizationService'          : { deps: ['app/services'] },
        'app/services/optionService'                : { deps: ['app/services'] },
        'app/services/Schools'                      : { deps: ['app/services'] },
        'app/services/stripeService'                : { deps: ['app/services'] },
        'app/services/apiWrapper'                   : { deps: ['app/services'] },
        'app/services/SystemPropertiesService'      : { deps: ['app/services'] },
        'app/services/createDialog'                 : { deps: ['app/services'] },
        'app/services/mappingService'               : { deps: ['app/services'] },
        'app/services/organizationMappingService'   : { deps: ['app/services'] },
        'app/services/abbrevService'                : { deps: ['app/services'] },
        'app/services/profanityService'             : { deps: ['app/services'] },
        'app/services/visibilityApiService'         : { deps: ['app/services'] },
        'app/services/geocoderService'              : { deps: ['app/services'] },
        'app/services/profileCompletionService'     : { deps: ['app/services'] },
        'app/services/gameService'                  : { deps: ['app/services'] },
        'app/services/statusService'                : { deps: ['app/services'] },
        'app/services/errorLogService'           : { deps: ['app/services'] },
        'app/services/browseService'                : { deps: ['app/services'] },

        'app/controllers'                           : { deps: ['app/app'] },
        'app/controllers/AccountIndexCtrl'          : { deps: ['app/controllers'] },
        'app/controllers/LoginCtrl'                 : { deps: ['app/controllers'] },
        'app/controllers/MobileSplashCtrl'          : { deps: ['app/controllers'] },
        'app/controllers/RegisterCtrl'              : { deps: ['app/controllers'] },
        'app/controllers/ResourceSuggestionCreateCtrl' : { deps: ['app/controllers'] },
        'app/controllers/ResourceSuggestionEditCtrl'   : { deps: ['app/controllers'] },
        'app/controllers/ResourceSuggestionListCtrl'   : { deps: ['app/controllers'] },
        'app/controllers/PaymentCtrl'               : { deps: ['app/controllers'] },
        'app/controllers/UserInterestsCtrl'         : { deps: ['app/controllers'] },
        'app/controllers/UserSkillsCtrl'            : { deps: ['app/controllers'] },
        'app/controllers/InvitationCtrl'            : { deps: ['app/controllers'] },
        'app/controllers/InvitationListCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/SystemPropertiesCtrl'      : { deps: ['app/controllers'] },
        'app/controllers/NotificationsCtrl'         : { deps: ['app/controllers'] },
        'app/controllers/AdvertisementEditCtrl'     : { deps: ['app/controllers'] },
        'app/controllers/AdvertisementCreateCtrl'   : { deps: ['app/controllers'] },
        'app/controllers/AdvertisementDisplayCtrl'  : { deps: ['app/controllers'] },
        'app/controllers/AdvertisementsListCtrl'    : { deps: ['app/controllers'] },

        // Controllers (landing, dashboard, default)
        'app/controllers/LandingPageCtrl'           : { deps: ['app/controllers'] },
        'app/controllers/DashboardCtrl'             : { deps: ['app/controllers'] },
        'app/controllers/CollegeSelectionCtrl'      : { deps: ['app/controllers'] },

        // Controllers (Organization dash)
        'app/controllers/StudentTrackerListCtrl'    : { deps: ['app/controllers'] },

        // Controllers (student events)
        'app/controllers/StudentEventsCtrl'         : { deps: ['app/controllers'] },
        'app/controllers/StudentToggleCtrl'         : { deps: ['app/controllers'] },        

        // Controllers (messages, conversations)
        'app/controllers/MessageCtrl'               : { deps: ['app/controllers'] },
        'app/controllers/ConversationCtrl'          : { deps: ['app/controllers'] },
        'app/controllers/MessageWatchCtrl'          : { deps: ['app/controllers'] },

        // Controllers (student search)
        'app/controllers/StudentSearchCtrl'         : { deps: ['app/controllers']},
        'app/controllers/StudentSearchResultsCtrl'  : { deps: ['app/controllers']},
        'app/controllers/StudentMapCtrl'            : { deps: ['app/controllers'] },

        // Controllers (student list, parents list)
        'app/controllers/StudentsListCtrl'          : { deps: ['app/controllers'] },
        'app/controllers/ParentsListCtrl'           : { deps: ['app/controllers'] },

        // Controllers (edit user, update payment)
        'app/controllers/EditUserCtrl'              : { deps: ['app/controllers'] },
        'app/controllers/UpdatePaymentCtrl'         : { deps: ['app/controllers'] },

        // Controllers (student profile)
        'app/controllers/EditProfileCtrl'           : { deps: ['app/controllers'] },
        'app/controllers/ProfileCtrl'               : { deps: ['app/controllers'] },
        'app/controllers/DemographicsCtrl'          : { deps: ['app/controllers'] },
        'app/controllers/SchoolInfoCtrl'            : { deps: ['app/controllers'] },
        'app/controllers/SchoolSelectionCtrl'       : { deps: ['app/controllers'] },
        'app/controllers/CourseInfoCtrl'            : { deps: ['app/controllers'] },
        'app/controllers/VideoCtrl'                 : { deps: ['app/controllers'] },
        'app/controllers/InterestsCtrl'             : { deps: ['app/controllers'] },
        'app/controllers/TracksCtrl'                : { deps: ['app/controllers'] },
        'app/controllers/ActivitiesCtrl'            : { deps: ['app/controllers'] },
        'app/controllers/TestScoresCtrl'            : { deps: ['app/controllers'] },
        'app/controllers/FilesUploadCtrl'           : { deps: ['app/controllers'] },
        'app/controllers/ApScoresCtrl'              : { deps: ['app/controllers'] },
        'app/controllers/WorkkeysScoresCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/NoctiScoresCtrl'           : { deps: ['app/controllers'] },
        'app/controllers/BadgeGroupsCtrl'           : { deps: ['app/controllers'] },
        'app/controllers/CertificationsCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/AssociationsCtrl'          : { deps: ['app/controllers'] },
        'app/controllers/CredentialsCtrl'          : { deps: ['app/controllers'] },

        // Controllers (organization profile)
        'app/controllers/EditOrgProfileCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/OrgProfileCtrl'            : { deps: ['app/controllers'] },
        'app/controllers/OrgCtrl'                   : { deps: ['app/controllers'] },
        'app/controllers/OrgVideoCtrl'              : { deps: ['app/controllers'] },
        'app/controllers/FeedCtrl'                  : { deps: ['app/controllers'] },
        'app/controllers/MapCtrl'                    : { deps: ['app/controllers'] },
        'app/controllers/ManageDistrictCtrl'         : { deps: ['app/controllers'] },
        'app/controllers/ManageSchoolCtrl'           : { deps: ['app/controllers'] },


        // Controllers (admin, courses, dropdowns)
        'app/controllers/AdminUsersCtrl'            : { deps: ['app/controllers'] },
        'app/controllers/AdminStudentEventsCtrl'    : { deps: ['app/controllers'] },

        'app/controllers/StemScoreTestCtrl'         : { deps: ['app/controllers'] },

        'app/controllers/CollegeCoursesUploadCtrl'  : { deps: ['app/controllers'] },
        'app/controllers/CollegeCoursesListCtrl'    : { deps: ['app/controllers'] },
        'app/controllers/CollegeTrackerCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/DashboardEventsCtrl'       : { deps: ['app/controllers'] },
        'app/controllers/DashboardTestScoresCompareCtrl' :{ deps: ['app/controllers'] },
        'app/controllers/EditStudentEventCtrl'      : { deps: ['app/controllers'] },
        'app/controllers/HighschoolCourseListCtrl'  : { deps: ['app/controllers'] },
        'app/controllers/HighschoolCourseUploadCtrl': { deps: ['app/controllers'] },
        'app/controllers/OrgScholarshipCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/OrgInternshipCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/RecommendationsUploadCtrl' : { deps: ['app/controllers'] },
        'app/controllers/RecommendationsListCtrl'   : { deps: ['app/controllers'] },
        'app/controllers/TestMetricsUploadCtrl' : { deps: ['app/controllers'] },
        'app/controllers/TestMetricsListCtrl'   : { deps: ['app/controllers'] },
        'app/controllers/TestPercentilesListCtrl' : { deps: ['app/controllers'] },
        'app/controllers/SchoolViewCtrl'           : { deps: ['app/controllers'] },
        'app/controllers/SchoolsListCtrl'          : { deps: ['app/controllers'] },
        'app/controllers/SchoolsUploadCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/DropdownCtrl'              : { deps: ['app/controllers'] },
        'app/controllers/DropdownValuesCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/DropdownEditCtrl'          : { deps: ['app/controllers'] },
        'app/controllers/ProfileCompletionCtrl'     : { deps: ['app/controllers'] },
        'app/controllers/ProfilePictureCtrl'         : { deps: ['app/controllers'] },
        'app/controllers/ScheduledTasksCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/ScholarshipCtrl'           : { deps: ['app/controllers'] },
        'app/controllers/ScholarshipSearchCtrl'     : { deps: ['app/controllers'] },
        'app/controllers/ScholarshipViewCtrl'     : { deps: ['app/controllers'] },
        'app/controllers/ScholarshipSearchResultsCtrl'     : { deps: ['app/controllers'] },
        'app/controllers/InternshipCtrl'           : { deps: ['app/controllers'] },
        'app/controllers/InternshipSearchCtrl'     : { deps: ['app/controllers'] },
        'app/controllers/InternshipViewCtrl'     : { deps: ['app/controllers'] },
        'app/controllers/InternshipSearchResultsCtrl'     : { deps: ['app/controllers'] },

        'app/controllers/StemScoreRangeCtrl'      : { deps: ['app/controllers'] },

        'app/controllers/RankingRatingCtrl'       : { deps: ['app/controllers'] },

        'app/controllers/OrgSnapshotCtrl'         : { deps: ['app/controllers'] },
        'app/controllers/FAQCtrl'                 : { deps: ['app/controllers'] },
        'app/controllers/IssueCtrl'               : { deps: ['app/controllers'] },
        'app/controllers/SkillCtrl'               : { deps: ['app/controllers'] },
        'app/controllers/AdminPromoCodeCtrl'      : { deps: ['app/controllers'] },
        'app/controllers/OrgApplicationCtrl'      : { deps: ['app/controllers'] },
        'app/controllers/ApplicationSearchCtrl'   : { deps: ['app/controllers'] },
        'app/controllers/ApplicationSearchResultsCtrl' : { deps: ['app/controllers'] },
        'app/controllers/ApplicationViewCtrl'     : { deps: ['app/controllers'] },
        'app/controllers/ApplicantsViewCtrl'      : { deps: ['app/controllers'] },
        'app/controllers/OrgDashboardCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/OrgDashboardMapCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/ExportProfileCtrl'          : { deps: ['app/controllers'] },
        'app/controllers/PltwScoresCtrl'          : { deps: ['app/controllers'] },
        'app/controllers/OrganizationSearchCtrl'  : { deps: ['app/controllers'] },
        'app/controllers/OrganizationSearchResultsCtrl'  : { deps: ['app/controllers'] },
        'app/controllers/OrganizationMapCtrl'     : { deps: ['app/controllers'] },
        'app/controllers/NextStepsCtrl'           : { deps: ['app/controllers'] },
        'app/controllers/ProfileModalCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/NewUpgradeCtrl'          : { deps: ['app/controllers'] },
        'app/controllers/SPStatsCtrl'             : { deps: ['app/controllers'] },
        'app/controllers/AdminAchievementsCtrl'   : { deps: ['app/controllers'] },
        'app/controllers/AdminPointsActionsCtrl'  : { deps: ['app/controllers'] },
        'app/controllers/LeaderBoardCtrl'         : { deps: ['app/controllers'] },
        'app/controllers/ApiKeyCtrl'              : { deps: ['app/controllers'] },
        'app/controllers/ManageTriviaCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/QODCtrl'                 : { deps: ['app/controllers'] },
        'app/controllers/PublicProfileCtrl'       : { deps: ['app/controllers'] },
        'app/controllers/ManageInvitationsCtrl'   : { deps: ['app/controllers'] },
        'app/controllers/MentorDashboardCtrl'     : { deps: ['app/controllers'] },
        'app/controllers/MentorsListCtrl'         : { deps: ['app/controllers'] },
        'app/controllers/MentorsChatCtrl'         : { deps: ['app/controllers'] },
        'app/controllers/OrganizationListCtrl'    : { deps: ['app/controllers'] },
        'app/controllers/StudentGroupsCtrl'       : { deps: ['app/controllers'] },
        'app/controllers/ClientErrorsCtrl'        : { deps: ['app/controllers'] },
        'app/controllers/OrgRelationshipCtrl'     : { deps: ['app/controllers'] },
        'app/controllers/GraphSearchCtrl'         : { deps: ['app/controllers'] },

        'app/directives'                          : { deps: ['app/app'] },

        'app/filters'                             : { deps: ['app/app'] },

        'app/directives/angles'                   : { deps: ['app/app'] }
    }
}, [
    // Require Load Modules
    'require',

    // APP
    'app/app',

    // Common
    'app/common/stemServer',
    'app/common/analytics',

    // Services
    'app/services',
    'app/services/userService',
    'app/services/securityService',
    'app/services/dataGrid',
    'app/services/loadingService',
    'app/services/emailService',
    'app/services/parentStudentRelService',
    'app/services/dropdownValueService',
    'app/services/invitationService',
    'app/services/studentEventsService',
    'app/services/organizationService',
    'app/services/optionService',
    'app/services/Schools',
    'app/services/stripeService',
    'app/services/apiWrapper',
    'app/services/SystemPropertiesService',
    'app/services/createDialog',
    'app/services/mappingService',
    'app/services/organizationMappingService',
    'app/services/abbrevService',
    'app/services/profanityService',
    'app/services/visibilityApiService',
    'app/services/geocoderService',
    'app/services/profileCompletionService',
    'app/services/gameService',
    'app/services/statusService',
    'app/services/errorLogService',
    'app/services/browseService',

    // Controllers
    'app/controllers',
    'app/controllers/AccountIndexCtrl',
    'app/controllers/LoginCtrl',
    'app/controllers/MobileSplashCtrl',
    'app/controllers/RegisterCtrl',
    'app/controllers/ResourceSuggestionCreateCtrl',
    'app/controllers/ResourceSuggestionEditCtrl',
    'app/controllers/ResourceSuggestionListCtrl',
    'app/controllers/PaymentCtrl',
    'app/controllers/UserInterestsCtrl',
    'app/controllers/UserSkillsCtrl',
    'app/controllers/InvitationCtrl',
    'app/controllers/InvitationListCtrl',
    'app/controllers/SystemPropertiesCtrl',
    'app/controllers/NotificationsCtrl',
    'app/controllers/AdvertisementEditCtrl',
    'app/controllers/AdvertisementCreateCtrl',
    'app/controllers/AdvertisementDisplayCtrl',
    'app/controllers/AdvertisementsListCtrl',

    // Controllers (landing, dashboard, default)
    'app/controllers/LandingPageCtrl',
    'app/controllers/DashboardCtrl',
    'app/controllers/CollegeSelectionCtrl',


    // Controllers (Organization dash)
    'app/controllers/StudentTrackerListCtrl',

    // Controllers (student events)
    'app/controllers/StudentEventsCtrl',
    'app/controllers/StudentToggleCtrl',

    // Controllers (messages, conversations)
    'app/controllers/MessageCtrl',
    'app/controllers/ConversationCtrl',
    'app/controllers/MessageWatchCtrl',

    //Controllers (student search)
    'app/controllers/StudentSearchCtrl',
    'app/controllers/StudentSearchResultsCtrl',
    'app/controllers/StudentMapCtrl',

    // Controllers (student list, parents list)
    'app/controllers/StudentsListCtrl',
    'app/controllers/ParentsListCtrl',

    // Controllers (edit user)
    'app/controllers/EditUserCtrl',

    // Controllers (student profile)
    'app/controllers/EditProfileCtrl',
    'app/controllers/ProfileCtrl',
    'app/controllers/DemographicsCtrl',
    'app/controllers/SchoolInfoCtrl',
    'app/controllers/SchoolSelectionCtrl',
    'app/controllers/CourseInfoCtrl',
    'app/controllers/VideoCtrl',
    'app/controllers/InterestsCtrl',
    'app/controllers/TracksCtrl',
    'app/controllers/BadgeGroupsCtrl',
    'app/controllers/ActivitiesCtrl',
    'app/controllers/TestScoresCtrl',
    'app/controllers/FilesUploadCtrl',
    'app/controllers/ApScoresCtrl',
    'app/controllers/WorkkeysScoresCtrl',
    'app/controllers/NoctiScoresCtrl',
    'app/controllers/CertificationsCtrl',
    'app/controllers/AssociationsCtrl',
    'app/controllers/CredentialsCtrl',

    // Controllers (organization profile)
    'app/controllers/EditOrgProfileCtrl',
    'app/controllers/OrgProfileCtrl',
    'app/controllers/OrgCtrl',
    'app/controllers/OrgVideoCtrl',
    'app/controllers/FeedCtrl',
    'app/controllers/MapCtrl',
    'app/controllers/ManageDistrictCtrl',
    'app/controllers/ManageSchoolCtrl',


    // Controllers (admin, courses, dropdowns)
    'app/controllers/AdminUsersCtrl',
    'app/controllers/AdminStudentEventsCtrl',
    'app/controllers/CollegeCoursesUploadCtrl',
    'app/controllers/CollegeCoursesListCtrl',
    'app/controllers/CollegeTrackerCtrl',
    'app/controllers/DashboardEventsCtrl',
    'app/controllers/DashboardTestScoresCompareCtrl',
    'app/controllers/EditStudentEventCtrl',
    'app/controllers/HighschoolCourseListCtrl',
    'app/controllers/HighschoolCourseUploadCtrl',
    'app/controllers/SchoolViewCtrl',
    'app/controllers/SchoolsListCtrl',
    'app/controllers/SchoolsUploadCtrl',

    'app/controllers/OrgScholarshipCtrl',
    'app/controllers/OrgInternshipCtrl',

    'app/controllers/RecommendationsUploadCtrl',
    'app/controllers/RecommendationsListCtrl',

    'app/controllers/TestMetricsUploadCtrl',
    'app/controllers/TestMetricsListCtrl',

    'app/controllers/TestPercentilesListCtrl',

    'app/controllers/StemScoreTestCtrl',

    'app/controllers/DropdownCtrl',
    'app/controllers/DropdownValuesCtrl',
    'app/controllers/DropdownEditCtrl',
    'app/controllers/ProfileCompletionCtrl',
    'app/controllers/ProfilePictureCtrl',
    'app/controllers/ScheduledTasksCtrl',
    'app/controllers/ScholarshipCtrl',
    'app/controllers/ScholarshipSearchCtrl',
    'app/controllers/ScholarshipSearchResultsCtrl',
    'app/controllers/ScholarshipViewCtrl',
    'app/controllers/InternshipSearchCtrl',
    'app/controllers/InternshipSearchResultsCtrl',
    'app/controllers/InternshipViewCtrl',

    'app/controllers/StemScoreRangeCtrl',

    'app/controllers/RankingRatingCtrl',

    'app/controllers/OrgSnapshotCtrl',
    'app/controllers/FAQCtrl',
    'app/controllers/IssueCtrl',
    'app/controllers/SkillCtrl',
    'app/controllers/AdminPromoCodeCtrl',
    'app/controllers/OrgApplicationCtrl',
    'app/controllers/ApplicationSearchCtrl',
    'app/controllers/ApplicationSearchResultsCtrl',
    'app/controllers/ApplicationViewCtrl',
    'app/controllers/ApplicantsViewCtrl',
    'app/controllers/OrgDashboardCtrl',
    'app/controllers/OrgDashboardMapCtrl',
    'app/controllers/ExportProfileCtrl',
    'app/controllers/PltwScoresCtrl',
    'app/controllers/OrganizationSearchCtrl',
    'app/controllers/OrganizationSearchResultsCtrl',
    'app/controllers/OrganizationMapCtrl',
    'app/controllers/NextStepsCtrl',
    'app/controllers/ProfileModalCtrl',
    'app/controllers/NewUpgradeCtrl',
    'app/controllers/SPStatsCtrl',
    'app/controllers/AdminAchievementsCtrl',
    'app/controllers/AdminPointsActionsCtrl',
    'app/controllers/LeaderBoardCtrl',
    'app/controllers/ApiKeyCtrl',
    'app/controllers/ManageTriviaCtrl',
    'app/controllers/QODCtrl',
    'app/controllers/PublicProfileCtrl',
    'app/controllers/ManageInvitationsCtrl',
    'app/controllers/MentorDashboardCtrl',
    'app/controllers/MentorsListCtrl',
    'app/controllers/MentorsChatCtrl',
    'app/controllers/OrganizationListCtrl',
    'app/controllers/StudentGroupsCtrl',
    'app/controllers/ClientErrorsCtrl',
    'app/controllers/OrgRelationshipCtrl',
    'app/controllers/GraphSearchCtrl',

    // Directives
    'app/directives',

    // Filters
    'app/filters',


    'app/directives/angles'

    // Remember - no comma on last item

], function(require, app) {
    return angular.element(document).ready(function() {

        // After all have loaded, run the Angular Boostrapper
        return angular.bootstrap(document, ["STEM"]);

    });
});
