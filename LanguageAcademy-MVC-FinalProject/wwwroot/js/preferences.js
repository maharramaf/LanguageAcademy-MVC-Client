/* Theme and language preferences. Frontend only. Keys: mf-theme, mf-language. */
const phraseKeys = {
  "Home": "nav_home",
  "About": "nav_about",
  "Courses": "nav_courses",
  "Teachers": "nav_teachers",
  "Students": "nav_students",
  "Contact": "nav_contact",
  "Login": "nav_login",
  "Register": "nav_register",
  "Search courses": "search_placeholder",
  "Open menu": "open_menu",
  "Close menu": "close_menu",
  "Previous courses": "slider_prev_courses",
  "Next courses": "slider_next_courses",
  "Previous testimonials": "slider_prev_stories",
  "Next testimonials": "slider_next_stories",
  "Back to top": "back_to_top",
  "Skip to content": "skip_content",
  "Quick Links": "footer_quick",
  "Contact Information": "footer_contact",
  "Social Media": "footer_social",
  "Full catalog": "footer_catalog",
  "Facebook": "social_facebook",
  "Instagram": "social_instagram",
  "LinkedIn": "social_linkedin",
  "YouTube": "social_youtube",
  "Explore Courses": "btn_explore",
  "Get Started": "btn_start",
  "View Course": "btn_view_course",
  "Browse All Courses": "btn_browse",
  "More About Us": "btn_more_about",
  "View Profile": "btn_view_profile",
  "Start Learning": "btn_start_learning",
  "Subscribe": "btn_subscribe",
  "Send Message": "btn_send",
  "Enroll Now": "btn_enroll",
  "Write a Review": "btn_write_review",
  "Browse catalog": "btn_browse_catalog",
  "Contact the School": "btn_contact_school",
  "View Path": "btn_view_path",
  "Read More": "btn_read_more",
  "Save Changes": "btn_save",
  "Send Reset Link": "btn_reset",
  "Forgot Password?": "btn_forgot",
  "Logout": "dash_logout",
  "Modern language school": "hero_eyebrow",
  "Learn Languages. Open New Doors.": "hero_title",
  "Improve your language skills with professional teachers and modern learning methods.": "hero_lead",
  "Small classes": "hero_small",
  "Certified teachers": "hero_certified",
  "Online and on campus": "hero_online",
  "Active students": "hero_active",
  "Average rating": "hero_rating",
  "Popular courses": "courses_eyebrow",
  "Popular Courses": "courses_title",
  "English Beginner": "course_en_beginner",
  "English Intermediate": "course_en_intermediate",
  "IELTS Preparation": "course_ielts",
  "Business English": "course_business",
  "German Language": "course_german",
  "Spanish Language": "course_spanish",
  "French Beginner": "course_french",
  "About us": "about_eyebrow",
  "About MF Language Academy": "about_title",
  "Why choose us": "why_eyebrow",
  "A school built around speaking": "why_title",
  "Expert Teachers": "feat_teachers",
  "Flexible Schedule": "feat_schedule",
  "Online Learning": "feat_online",
  "Certificate": "feat_certificate",
  "Small Classes": "feat_small",
  "Modern Materials": "feat_materials",
  "Learn with people who teach for a living": "teachers_title",
  "Years Experience": "stat_years",
  "Testimonials": "testimonials_eyebrow",
  "What students say after class": "testimonials_title",
  "Ready to Start Learning?": "cta_title",
  "Newsletter": "newsletter_eyebrow",
  "Course news, in your inbox": "newsletter_title",
  "You are on the list": "newsletter_success",
  "Email": "label_email",
  "Password": "label_password",
  "Phone": "label_phone",
  "Name": "label_name",
  "Subject": "label_subject",
  "Message": "label_message",
  "First Name": "label_first",
  "Last Name": "label_last",
  "Full name": "label_full_name",
  "Bio": "label_bio",
  "Languages": "label_languages",
  "New password": "label_new_password",
  "Dashboard": "dash_home",
  "My Courses": "dash_my_courses",
  "Messages": "dash_messages",
  "Profile": "dash_profile",
  "Settings": "dash_settings",
  "Good to see you": "dash_hello",
  "Welcome back, Maya": "dash_welcome",
  "Here is a snapshot of courses, students, and messages. All figures on this screen are sample data.": "dash_snapshot",
  "Active courses": "dash_active_courses",
  "Open messages": "dash_open_messages",
  "My courses": "dash_my_courses_stat",
  "Completed": "dash_completed",
  "In progress": "dash_progress",
  "Certificates": "dash_certificates",
  "Welcome back to class.": "auth_welcome",
  "Pick up your courses, messages, and progress from the learning portal.": "auth_welcome_text",
  "Small classes. Real conversations. Boston and online.": "auth_aside",
  "Portal": "auth_portal",
  "Use any valid email and a password of at least 8 characters. This preview does not check an account.": "auth_login_note",
  "Start with a clear plan.": "auth_register_title",
  "Reset password": "auth_reset",
  "Find a course that matches your goal": "courses_page_title",
  "All": "filter_all",
  "English": "lang_english",
  "Exam Prep": "filter_exam",
  "Business": "filter_business",
  "German": "filter_german",
  "Spanish": "filter_spanish",
  "French": "filter_french",
  "Beginner": "level_beginner",
  "Intermediate": "level_intermediate",
  "Advanced": "level_advanced",
  "Upper intermediate": "level_upper",
  "Online": "filter_online",
  "Offline": "filter_offline",
  "Speaking": "filter_speaking",
  "Vocabulary": "filter_vocab",
  "Exam": "badge_exam",
  "Faculty": "teachers_eyebrow",
  "Teachers who still love the classroom": "teachers_page_title",
  "Want to teach with us?": "teachers_cta",
  "Student life": "students_eyebrow",
  "Learners with a reason to speak": "students_title",
  "Stories": "students_stories",
  "Recent student highlights": "students_highlights",
  "Study clubs": "students_clubs",
  "Progress checks": "students_checks",
  "Contact the language school": "contact_title",
  "Questions before you join": "contact_faq",
  "Help before you write": "contact_help",
  "Learning paths": "paths_crumb",
  "Follow a path from first greetings to exam or workplace English.": "paths_lead",
  "How it works": "paths_how",
  "Four steps to a certificate": "paths_steps",
  "1. Choose a course": "paths_step1",
  "Pick a level and a goal from the catalog.": "paths_step1_text",
  "2. Enroll": "paths_step2",
  "Send an enrollment request from the course page.": "paths_step2_text",
  "3. Learn and practice": "paths_step3",
  "Watch lessons, read notes, and take quizzes.": "paths_step3_text",
  "4. Get your certificate": "paths_step4",
  "Finish the path and keep your certificate on file.": "paths_step4_text",
  "Beginner English": "path_beginner",
  "Start with greetings, sounds, and daily phrases.": "path_beginner_text",
  "Intermediate English": "path_intermediate",
  "Hold longer conversations and write clearer emails.": "path_intermediate_text",
  "Advanced English": "path_advanced",
  "Discuss complex topics with more precision.": "path_advanced_text",
  "Frequently asked questions": "faq_title",
  "Events": "events_crumb",
  "Events and workshops": "events_title",
  "Blog": "blog_crumb",
  "Learning articles": "blog_title",
  "Featured": "blog_featured",
  "How to improve English speaking": "blog_speaking_title",
  "Short daily speaking beats long silent study. Use one real situation each day.": "blog_speaking_text",
  "Instructors": "instructors_crumb",
  "The original teacher page is still available. This listing adds ratings and profile links.": "instructors_lead",
  "Notifications": "notes_title",
  "Unread items are highlighted. Click one to mark it read.": "notes_lead",
  "New lesson published": "note_lesson",
  "English A1 · Lesson 03 is ready.": "note_lesson_text",
  "Quiz result": "note_quiz",
  "Introduction check · 9/10.": "note_quiz_text",
  "Certificate ready": "note_cert",
  "Spanish beginner certificate is available to preview.": "note_cert_text",
  "Instructor announcement": "note_announce",
  "Sarah Johnson moved Monday lab to 18:00.": "note_announce_text",
  "Unread": "status_unread",
  "Read": "status_read",
  "Profile and settings": "profile_title",
  "This form can later be used by a student or an instructor. Nothing is saved on a server.": "profile_lead",
  "Student account preview": "profile_role",
  "FAQ": "faq_crumb",
  "Description": "tab_description",
  "What you will learn": "tab_outcomes",
  "Course description": "course_description",
  "Included": "course_included",
  "This course includes": "course_includes",
  "Lifetime Access": "include_lifetime",
  "Certificate of Completion": "include_certificate",
  "Mobile and Desktop Access": "include_devices",
  "Curriculum": "course_curriculum",
  "Modules, lessons, and quizzes": "course_modules",
  "Before you start": "course_before",
  "Requirements": "course_requirements",
  "No previous English knowledge is required.": "req_none",
  "Basic computer skills are recommended.": "req_computer",
  "An internet connection is required.": "req_internet",
  "Students should be able to watch video lessons and complete quizzes.": "req_watch",
  "Demo data": "course_demo",
  "Course progress": "course_progress",
  "This bar is static preview data until a student account is connected.": "course_progress_note",
  "Instructor": "course_instructor",
  "Learn with Sarah Johnson": "course_sarah",
  "English Language Instructor": "role_sarah",
  "Reviews": "course_reviews",
  "What learners say": "course_reviews_title",
  "Questions before you enroll": "course_faq_title",
  "Is this course suitable for beginners?": "faq_beginners",
  "How long do I have access to the course?": "faq_access",
  "Will I receive a certificate?": "faq_certificate",
  "Can I learn from a mobile device?": "faq_mobile",
  "Yes. Lessons are laid out for both phone and desktop screens.": "faq_mobile_answer",
  "Are quizzes included?": "faq_quizzes",
  "Each module ends with a short quiz so you can check the new phrases.": "faq_quizzes_answer",
  "Do I need previous English knowledge?": "faq_previous",
  "No previous English knowledge is required for this beginner course.": "faq_previous_answer",
  "Related courses": "related_eyebrow",
  "Continue after A1": "related_title",
  "English A2": "course_a2",
  "Longer conversations and clearer everyday writing.": "course_a2_text",
  "Timed practice for listening, reading, writing, and speaking.": "course_ielts_card",
  "English Speaking": "course_speaking",
  "A speaking-first workshop for longer turns.": "course_speaking_text",
  "per course": "price_per_course",
  "English Program Lead": "role_elena",
  "IELTS Instructor": "role_daniel",
  "Spanish Instructor": "role_sophie",
  "German Instructor": "role_markus",
  "Conversation Coach": "role_aiko",
  "Close": "btn_close",
  "Breadcrumb": "aria_breadcrumb",
  "Primary": "aria_primary",
  "Show password": "show_password",
  "Hide password": "hide_password",
  "Enrollment requested": "enroll_requested",
  "all courses": "search_all",
  "8 weeks": "duration_8",
  "10 weeks": "duration_10",
  "32 lessons": "lessons_32",
  "20 live lessons": "lessons_20",
  "16 live lessons": "lessons_16",
  "English A1 — Complete Beginner Course": "course_a1_title",
  "Start English from zero with guided speaking, everyday vocabulary, and clear grammar you can use the same day.": "course_a1_summary",
  "This beginner pathway takes you from first greetings to short everyday conversations. Each module mixes video, reading, and a short quiz. Classes stay practical, with pronunciation and daily situations at the center.": "course_a1_overview",
  "Introduce yourself in English": "learn_intro_en",
  "Understand basic conversations": "learn_listen",
  "Build everyday vocabulary": "learn_vocab",
  "Use basic grammar": "learn_grammar",
  "Improve pronunciation": "learn_pronounce",
  "Speak in common daily situations": "learn_daily",
  "Move from careful sentences to fluent discussion. You will practice opinion, story, and workplace English.": "course_mid_summary",
  "Learners at this level already know the basics. The course pushes accuracy and flow with debates, short writing, and real listening.": "course_mid_overview",
  "Start German with practical dialogues, clear grammar, and pronunciation you can trust.": "course_de_summary",
  "Learn Spanish you can speak from the first class, with culture notes woven into every topic.": "course_es_summary",
  "A friendly start in French, with pronunciation coaching and conversations for travel and study.": "course_fr_summary",
  "Sound clear and credible in meetings, presentations, and professional email.": "course_biz_summary",
  "Train for the Academic IELTS with timed tasks, score-focused feedback, and strategies for each paper.": "course_ielts_summary",
  "Academic coordinator": "role_maya",
  "Remember me": "label_remember",
  "Create account": "btn_create",
  "Go to Login": "btn_go_login",
  "No courses match your search.": "empty_courses",
  "No results": "empty_results",
  "Previous": "pager_prev",
  "Next": "pager_next",
  "Sort": "label_sort",
  "Level": "label_level",
  "Language": "label_language",
  "Price": "label_price",
  "Free": "price_free",
  "Preview": "btn_preview",
  "Play preview": "btn_play_preview",
  "Submit review": "btn_submit_review",
  "Your name": "label_your_name",
  "Your review": "label_your_review",
  "Rating": "label_rating",
  "Please write at least 10 characters.": "err_message_short",
  "Name is required.": "err_name_required",
  "Email is required.": "err_email_required",
  "Enter a valid email address.": "err_email_invalid",
  "Phone is required.": "err_phone_required",
  "Enter a valid phone number.": "err_phone_invalid",
  "Password is required.": "err_password_required",
  "Use at least 8 characters.": "err_password_short",
  "First name is required.": "err_first_required",
  "Last name is required.": "err_last_required",
  "Subject is required.": "err_subject_required",
  "Message is required.": "err_message_required",
  "Bio is required.": "err_bio_required",
  "Confirm your password.": "err_confirm_required",
  "Passwords do not match.": "err_confirm_mismatch",
  "Leave blank in this preview": "profile_password_hint",
  "I am studying beginner English three evenings a week.": "profile_bio_value",
  "Search catalog": "search_catalog",
  "Search instructors": "search_instructors",
  "Search students": "search_students",
  "Search articles": "search_articles",
  "At least 8 characters": "password_hint",
  "Course or question": "contact_subject_hint",
  "Tell us your goal and preferred schedule": "contact_message_hint",
  "What did you learn?": "review_hint",
  "Remember Me": "label_remember",
  "Confirm Password": "label_confirm",
  "New student": "auth_new",
  "Back to website": "auth_back",
  "A valid form opens the dashboard preview.": "auth_login_hint",
  "Fill in your details. This form checks them locally and does not create an account.": "auth_register_note",
  "Create a student profile, then choose a course that matches your level and schedule.": "auth_register_aside",
  "Email checked": "auth_email_checked",
  "Enter your email. This preview only checks the format.": "auth_reset_note"
};

const translations = {
  en: {},
  az: {
    nav_home: "Ana səhifə",
    nav_about: "Haqqımızda",
    nav_courses: "Kurslar",
    nav_teachers: "Müəllimlər",
    nav_students: "Tələbələr",
    nav_contact: "Əlaqə",
    nav_login: "Giriş",
    nav_register: "Qeydiyyat",
    search_placeholder: "Kurs axtar",
    search_clear: "Axtarışı təmizlə",
    search_none_title: "Kurs tapılmadı",
    search_none_lead: "Bu axtarışa uyğun kurs yoxdur",
    search_none_try: "Başqa söz yoxlayın.",
    search_none_filters: "Bu süzgəclərə uyğun kurs yoxdur.",
    search_showing_all: "Bütün kurslar göstərilir",
    search_course_one: "kurs",
    search_course_many: "kurs",
    search_courses_found: "kurs tapıldı",
    search_showing: "Göstərilir",
    search_of: "/",
    search_go: "Axtar",
    page_missing: "Səhifə tapılmadı",
    page_missing_text: "Bu səhifə mövcud deyil.",
    open_menu: "Menyunu aç",
    close_menu: "Menyunu bağla",
    slider_prev_courses: "Əvvəlki kurslar",
    slider_next_courses: "Növbəti kurslar",
    slider_prev_stories: "Əvvəlki rəylər",
    slider_next_stories: "Növbəti rəylər",
    back_to_top: "Yuxarı qayıt",
    skip_content: "Məzmuna keç",
    footer_quick: "Sürətli keçidlər",
    footer_contact: "Əlaqə məlumatı",
    footer_social: "Sosial şəbəkələr",
    footer_catalog: "Tam kataloq",
    social_facebook: "Facebook",
    social_instagram: "Instagram",
    social_linkedin: "LinkedIn",
    social_youtube: "YouTube",
    btn_explore: "Kurslara bax",
    btn_start: "Başla",
    btn_view_course: "Kursa bax",
    btn_browse: "Bütün kurslar",
    btn_more_about: "Haqqımızda daha çox",
    btn_view_profile: "Profilə bax",
    btn_start_learning: "Öyrənməyə başla",
    btn_subscribe: "Abunə ol",
    btn_send: "Mesaj göndər",
    btn_enroll: "İndi qoşul",
    btn_write_review: "Rəy yaz",
    btn_browse_catalog: "Kataloqa bax",
    btn_contact_school: "Məktəblə əlaqə",
    btn_view_path: "Yola bax",
    btn_read_more: "Ətraflı",
    btn_save: "Dəyişiklikləri saxla",
    btn_reset: "Sıfırlama linki göndər",
    btn_forgot: "Şifrəni unutmusunuz?",
    dash_logout: "Çıxış",
    hero_eyebrow: "Müasir dil məktəbi",
    hero_title: "Dil öyrən. Yeni qapılar aç.",
    hero_lead: "Peşəkar müəllimlər və müasir metodlarla dil bacarıqlarınızı inkişaf etdirin.",
    hero_small: "Kiçik qruplar",
    hero_certified: "Sertifikatlı müəllimlər",
    hero_online: "Onlayn və kampusda",
    hero_active: "Aktiv tələbə",
    hero_rating: "Orta qiymət",
    courses_eyebrow: "Məşhur kurslar",
    courses_title: "Məşhur kurslar",
    course_en_beginner: "İngilis dili — başlanğıc",
    course_en_intermediate: "İngilis dili — orta",
    course_ielts: "IELTS hazırlığı",
    course_business: "Biznes ingiliscəsi",
    course_german: "Alman dili",
    course_spanish: "İspan dili",
    course_french: "Fransız dili — başlanğıc",
    about_eyebrow: "Haqqımızda",
    about_title: "MF Language Academy haqqında",
    why_eyebrow: "Niyə biz",
    why_title: "Danışıq üzərində qurulmuş məktəb",
    feat_teachers: "Təcrübəli müəllimlər",
    feat_schedule: "Çevik cədvəl",
    feat_online: "Onlayn təhsil",
    feat_certificate: "Sertifikat",
    feat_small: "Kiçik qruplar",
    feat_materials: "Müasir materiallar",
    teachers_title: "Peşəkar müəllimlərlə öyrənin",
    stat_years: "İllik təcrübə",
    testimonials_eyebrow: "Rəylər",
    testimonials_title: "Tələbələr dərsdən sonra nə deyir",
    cta_title: "Öyrənməyə hazırsınız?",
    newsletter_eyebrow: "Bülleten",
    newsletter_title: "Kurs xəbərləri poçtunuza",
    newsletter_success: "Siyahıdasınız",
    label_email: "E-poçt",
    label_password: "Şifrə",
    label_phone: "Telefon",
    label_name: "Ad",
    label_subject: "Mövzu",
    label_message: "Mesaj",
    label_first: "Ad",
    label_last: "Soyad",
    label_full_name: "Tam ad",
    label_bio: "Haqqınızda",
    label_languages: "Dillər",
    label_new_password: "Yeni şifrə",
    dash_home: "İdarə paneli",
    dash_my_courses: "Kurslarım",
    dash_messages: "Mesajlar",
    dash_profile: "Profil",
    dash_settings: "Ayarlar",
    dash_hello: "Sizi görmək xoşdur",
    dash_welcome: "Xoş gəldiniz, Maya",
    dash_snapshot: "Kurslar, tələbələr və mesajların qısa görünüşü. Bu ekrandakı rəqəmlər nümunə məlumatdır.",
    dash_active_courses: "Aktiv kurslar",
    dash_open_messages: "Açıq mesajlar",
    dash_my_courses_stat: "Kurslarım",
    dash_completed: "Tamamlanan",
    dash_progress: "Davam edən",
    dash_certificates: "Sertifikatlar",
    auth_welcome: "Dərsə yenidən xoş gəldiniz.",
    auth_welcome_text: "Kurslarınızı, mesajlarınızı və irəliləyişinizi tədris portalından davam etdirin.",
    auth_aside: "Kiçik qruplar. Həqiqi söhbətlər. Boston və onlayn.",
    auth_portal: "Portal",
    auth_login_note: "İstənilən düzgün e-poçt və ən azı 8 simvollu şifrə istifadə edin. Bu önizləmə hesabı yoxlamır.",
    auth_register_title: "Aydın planla başlayın.",
    auth_reset: "Şifrəni sıfırla",
    courses_page_title: "Məqsədinizə uyğun kurs tapın",
    filter_all: "Hamısı",
    lang_english: "İngilis",
    filter_exam: "İmtahan hazırlığı",
    filter_business: "Biznes",
    filter_german: "Alman",
    filter_spanish: "İspan",
    filter_french: "Fransız",
    level_beginner: "Başlanğıc",
    level_intermediate: "Orta",
    level_advanced: "İrəli",
    level_upper: "Orta-irəli",
    filter_online: "Onlayn",
    filter_offline: "Əyani",
    filter_speaking: "Danışıq",
    filter_vocab: "Lüğət",
    badge_exam: "İmtahan",
    teachers_eyebrow: "Müəllimlər",
    teachers_page_title: "Sinif otağını sevən müəllimlər",
    teachers_cta: "Bizimlə dərs demək istəyirsiniz?",
    students_eyebrow: "Tələbə həyatı",
    students_title: "Danışmaq üçün səbəbi olan tələbələr",
    students_stories: "Hekayələr",
    students_highlights: "Son tələbə uğurları",
    students_clubs: "Tədris klubları",
    students_checks: "İrəliləyiş yoxlamaları",
    contact_title: "Dil məktəbi ilə əlaqə",
    contact_faq: "Qoşulmazdan əvvəl suallar",
    contact_help: "Yazmazdan əvvəl kömək",
    paths_crumb: "Öyrənmə yolları",
    paths_lead: "İlk salamdan imtahan və ya iş ingiliscəsinə qədər bir yol izləyin.",
    paths_how: "Necə işləyir",
    paths_steps: "Sertifikata dörd addım",
    paths_step1: "1. Kurs seçin",
    paths_step1_text: "Kataloqdan səviyyə və məqsəd seçin.",
    paths_step2: "2. Qoşulun",
    paths_step2_text: "Kurs səhifəsindən qoşulma sorğusu göndərin.",
    paths_step3: "3. Öyrənin və tətbiq edin",
    paths_step3_text: "Dərslərə baxın, qeydləri oxuyun və testləri keçin.",
    paths_step4: "4. Sertifikatınızı alın",
    paths_step4_text: "Yolu bitirin və sertifikatı saxlayın.",
    path_beginner: "Başlanğıc ingilis dili",
    path_beginner_text: "Salam, səslər və gündəlik ifadələrlə başlayın.",
    path_intermediate: "Orta səviyyə ingilis dili",
    path_intermediate_text: "Daha uzun söhbətlər və daha aydın e-poçtlar.",
    path_advanced: "İrəli səviyyə ingilis dili",
    path_advanced_text: "Mürəkkəb mövzuları daha dəqiq müzakirə edin.",
    faq_title: "Tez-tez verilən suallar",
    events_crumb: "Tədbirlər",
    events_title: "Tədbirlər və seminarlar",
    blog_crumb: "Bloq",
    blog_title: "Öyrənmə məqalələri",
    blog_featured: "Seçilmiş",
    blog_speaking_title: "İngilis danışığını necə yaxşılaşdırmaq olar",
    blog_speaking_text: "Qısa gündəlik danışıq uzun səssiz dərsdən üstündür. Hər gün bir real vəziyyət seçin.",
    instructors_crumb: "Təlimçilər",
    instructors_lead: "Əsas müəllim səhifəsi yerindədir. Bu siyahı reytinq və profil keçidləri əlavə edir.",
    notes_title: "Bildirişlər",
    notes_lead: "Oxunmamışlar vurğulanır. Oxunmuş etmək üçün birinə klikləyin.",
    mark_all_read: "Hamısını oxunmuş et",
    view_all_notifications: "Bütün bildirişlər",
    no_notifications: "Yeni bildiriş yoxdur",
    notifications_caught_up: "Hər şeyə baxmısınız.",
    open_notifications: "Bildirişlər",
    notify_filter_unread: "Oxunmamış",
    notification_new_course: "Yeni kurs əlavə olundu",
    notification_new_course_message: "Yeni kurs artıq açıqdır.",
    notification_new_lesson: "Yeni dərs hazırdır",
    notification_new_lesson_message: "Kursunuza yeni dərs əlavə olundu.",
    notification_quiz_result: "Test nəticəsi hazırdır",
    notification_quiz_result_message: "Test nəticənizə baxa bilərsiniz.",
    notification_certificate: "Sertifikat hazırdır",
    notification_certificate_message: "Təbriklər! Sertifikatınız hazırdır.",
    cert_congrats_title: "Təbriklər",
    cert_congrats_message: "Təbriklər! Siz {courseName} kursunu tamamladınız və sertifikat qazandınız.",
    cert_title: "Bitirmə sertifikatı",
    cert_my: "Sertifikatlarım",
    cert_view: "Sertifikata bax",
    cert_download: "Sertifikatı yüklə",
    cert_print: "Sertifikatı çap et",
    cert_id: "Sertifikat nömrəsi",
    cert_completed_on: "Tamamlanma tarixi",
    cert_instructor: "Müəllim",
    cert_none_title: "Hələ sertifikat yoxdur",
    cert_none_text: "İlk sertifikatınızı almaq üçün kursu tamamlayın.",
    cert_awarded: "Bu sertifikat verilir",
    cert_for: "kursunu uğurla bitirdiyinə görə",
    cert_back: "Dərslərə qayıt",
    cert_missing: "Sertifikat tapılmadı",
    cert_sign_role: "Akademik direktor",
    course_en_a2: "İngilis dili A2",
    cert_date_en_a2: "30 sentyabr 2026",
    course_en_a2_progress: "Tamamlanıb · 100%",
    quiz_notify_title: "Qeydiyyat uğurla tamamlandı!",
    quiz_notify_text: "Pulsuz ingilis dili səviyyə testini keçin və təxmini səviyyənizi öyrənin.",
    quiz_notify_btn: "Testə başla",
    quiz_close: "Bağla",
    quiz_title: "İngilis dili səviyyə testi",
    quiz_lead: "Bu qısa demo testdir. Nəticə rəsmi CEFR sertifikatı deyil.",
    quiz_progress: "Sual {current} / {total}",
    quiz_previous: "Əvvəlki",
    quiz_next: "Növbəti",
    quiz_submit: "Göndər",
    quiz_choose: "Davam etmək üçün bir cavab seçin.",
    quiz_result_title: "Test nəticəniz",
    quiz_score_label: "Bal",
    quiz_level_label: "Təxmini səviyyə",
    quiz_demo_note: "Bu, təxmini demo yerləşdirmə nəticəsidir. Rəsmi CEFR sertifikatı deyil.",
    quiz_recommend: "Tövsiyə olunan kurslar",
    quiz_no_courses: "Bu səviyyə üçün hazırda uyğun kurs yoxdur.",
    quiz_level_a1: "A1 — Başlanğıc",
    quiz_level_a2: "A2 — Elementar",
    quiz_level_b1: "B1 — Orta",
    quiz_level_b2: "B2 — Orta-irəli",
    quiz_level_c1: "C1 — İrəli",
    notification_enrollment: "Qoşulma uğurlu oldu",
    notification_enrollment_message: "Kursa uğurla qoşuldunuz.",
    notification_new_student: "Yeni tələbə qoşuldu",
    notification_new_student_message: "Kursunuza yeni tələbə yazıldı.",
    notification_announcement: "Yeni elan",
    notification_announcement_message: "MF Language Academy-dən yeni elan var.",
    time_just_now: "İndicə",
    time_5_minutes: "5 dəqiqə əvvəl",
    time_20_minutes: "20 dəqiqə əvvəl",
    time_1_hour: "1 saat əvvəl",
    time_yesterday: "Dünən",
    note_lesson: "Yeni dərs yayımlandı",
    note_lesson_text: "İngilis A1 · Dərs 03 hazırdır.",
    note_quiz: "Test nəticəsi",
    note_quiz_text: "Tanışlıq yoxlaması · 9/10.",
    note_cert: "Sertifikat hazırdır",
    note_cert_text: "İspan dili başlanğıc sertifikatına baxmaq olar.",
    note_announce: "Müəllim elanı",
    note_announce_text: "Sarah Johnson bazar ertəsi laboratoriyasını 18:00-a keçirdi.",
    status_unread: "Oxunmayıb",
    status_read: "Oxunub",
    profile_title: "Profil və ayarlar",
    profile_lead: "Bu forma sonradan tələbə və ya müəllim üçün istifadə oluna bilər. Serverdə heç nə saxlanılmır.",
    profile_role: "Tələbə hesabı önizləməsi",
    faq_crumb: "Suallar",
    tab_description: "Təsvir",
    tab_outcomes: "Nə öyrənəcəksiniz",
    course_description: "Kursun təsviri",
    course_included: "Daxildir",
    course_includes: "Bu kursa daxildir",
    include_lifetime: "Ömürlük giriş",
    include_certificate: "Bitirmə sertifikatı",
    include_devices: "Mobil və masaüstü giriş",
    course_curriculum: "Proqram",
    course_modules: "Modullar, dərslər və testlər",
    course_before: "Başlamazdan əvvəl",
    course_requirements: "Tələblər",
    req_none: "Əvvəlki ingilis dili biliyi tələb olunmur.",
    req_computer: "Əsas kompüter bacarıqları tövsiyə olunur.",
    req_internet: "İnternet bağlantısı tələb olunur.",
    req_watch: "Tələbə video dərslərə baxıb testləri tamamlaya bilməlidir.",
    course_demo: "Nümunə məlumat",
    course_progress: "Kurs irəliləyişi",
    course_progress_note: "Bu zolaq tələbə hesabı qoşulana qədər statik önizləmədir.",
    course_instructor: "Müəllim",
    course_sarah: "Sarah Johnson ilə öyrənin",
    role_sarah: "İngilis dili müəllimi",
    course_reviews: "Rəylər",
    course_reviews_title: "Tələbələr nə deyir",
    course_faq_title: "Qoşulmazdan əvvəl suallar",
    faq_beginners: "Bu kurs başlanğıc üçün uyğundur?",
    faq_access: "Kursa nə qədər girişim olacaq?",
    faq_certificate: "Sertifikat alacağam?",
    faq_mobile: "Mobil cihazdan öyrənə bilərəm?",
    faq_mobile_answer: "Bəli. Dərslər həm telefon, həm də masaüstü ekran üçün düzülüb.",
    faq_quizzes: "Testlər daxildir?",
    faq_quizzes_answer: "Hər modul yeni ifadələri yoxlamaq üçün qısa testlə bitir.",
    faq_previous: "Əvvəlki ingilis dili biliyi lazımdır?",
    faq_previous_answer: "Bu başlanğıc kursu üçün əvvəlki ingilis dili biliyi tələb olunmur.",
    related_eyebrow: "Oxşar kurslar",
    related_title: "A1-dən sonra davam edin",
    course_a2: "İngilis A2",
    course_a2_text: "Daha uzun söhbətlər və daha aydın gündəlik yazı.",
    course_ielts_card: "Dinləmə, oxu, yazı və danışıq üçün vaxtlı məşq.",
    course_speaking: "İngilis danışığı",
    course_speaking_text: "Daha uzun növbələr üçün danışıq yönümlü seminar.",
    price_per_course: "kurs üçün",
    role_elena: "İngilis proqramının rəhbəri",
    role_daniel: "IELTS müəllimi",
    role_sophie: "İspan dili müəllimi",
    role_markus: "Alman dili müəllimi",
    role_aiko: "Danışıq məşqçisi",
    btn_close: "Bağla",
    faq_label: "FAQ",
    faq_open: "Kömək və suallar",
    ai_title: "MF AI köməkçi",
    ai_subtitle: "Size necə kömək edə bilərəm?",
    ai_welcome: "Salam! MF Language Academy-yə xoş gəlmisiniz 👋",
    ai_placeholder: "Mesajınızı yazın...",
    ai_send: "Göndər",
    ai_typing: "AI yazır...",
    ai_open: "AI köməkçini aç",
    ai_hello: "Salam! MF Language Academy-də sizə necə kömək edə bilərəm?",
    ai_help: "Qrammatika, lüğət, danışıq və yazı üzrə məşq etməyə kömək edə bilərəm.",
    ai_present: "Present perfect keçmişdəki işi indiki zamanla bağlayır. Məsələn: I have finished my homework.",
    ai_demo: "Demo rejimindəyəm. Real AI funksiyası backend inteqrasiyasından sonra aktiv olacaq.",
    support_label: "Dəstək",
    faq_courses_certs: "Kurs və sertifikat sualları",
    faq_browse: "Kurslara bax",
    faq_learning: "Öyrənmə",
    faq_quiz: "Test və qiymətlər",
    faq_contact_support: "Dəstəklə əlaqə",
    faq_cat_courses: "Kurslar",
    faq_cat_lessons: "Dərslər",
    faq_cat_quizzes: "Testlər",
    faq_cat_certs: "Sertifikatlar",
    faq_cat_account: "Hesab",
    faq_cat_tech: "Texniki dəstək",
    faq_q_enroll: "Kursa necə qoşuluram?",
    faq_a_enroll: "Kataloqdan kurs seçin, kurs səhifəsini açın və İndi qoşul düyməsinə basın.",
    faq_q_view: "Kursuma necə baxım?",
    faq_a_view: "Kurs səhifəsini açın və ya dərs səhifəsində davam edin. Son açılan dərs siyahıda seçili qalır.",
    faq_q_access: "Kursa nə qədər girişim var?",
    faq_a_access: "Bu önizləmədə giriş müddəti kurs səhifəsində göstərilir. Hesab qoşulandan sonra müddət orada saxlanılacaq.",
    faq_q_continue: "Dayandığım yerdən necə davam edim?",
    faq_a_continue: "Dərs səhifəsini açın. Sol siyahıda son dərs seçili qalır, onu basıb davam edin.",
    faq_q_complete: "Dərsi tamamlanmış kimi necə işarələyim?",
    faq_a_complete: "Dərs səhifəsində Tamamlandı kimi işarələ düyməsinə basın. Bu, yalnız ekrandakı önizləmədir.",
    faq_q_quiz: "Testlər necə işləyir?",
    faq_a_quiz: "Dərs səhifəsində Qısa test dərsini açın, cavabı seçin və Göndər düyməsinə basın. Nəticə elə həmin səhifədə görünür.",
    faq_q_score: "Balımı harada görüm?",
    faq_a_score: "Balı dərs səhifəsinin yuxarısındakı qiymət cədvəlində görün. Test və qiymətlər keçidi sizi ora aparır.",
    faq_q_cert_when: "Sertifikatı nə vaxt alıram?",
    faq_a_cert_when: "Kursun dərsləri və testləri tamamlananda bitirmə sertifikatı hazır olur.",
    faq_q_cert_where: "Sertifikatları harada görüm?",
    faq_a_cert_where: "Sertifikatlar keçidini açın. Səhifədə ad, kurs, müəllim, tarix və sertifikat nömrəsi görünür.",
    faq_q_profile: "Profili necə yeniləyim?",
    faq_a_profile: "Profil səhifəsində ad, əlaqə və haqqınızda məlumatı dəyişib saxlayın.",
    faq_q_password: "Şifrəni necə dəyişim?",
    faq_a_password: "Profil səhifəsində yeni şifrə sahəsini doldurun. Bu önizləmə şifrəni serverə göndərmir.",
    faq_q_lesson_fail: "Dərs açılmasa nə edim?",
    faq_a_lesson_fail: "Səhifəni yeniləyin və ya başqa brauzer yoxlayın. Davam edərsə, əlaqə formasından yazın.",
    faq_q_contact: "Dəstəklə necə əlaqə saxlayım?",
    faq_a_contact: "Əlaqə səhifəsindəki formanı doldurun və ya hello@mflanguage.academy ünvanına yazın.",
    aria_breadcrumb: "Naviqasiya izi",
    aria_primary: "Əsas menyu",
    show_password: "Şifrəni göstər",
    hide_password: "Şifrəni gizlət",
    enroll_requested: "Qoşulma sorğusu göndərildi",
    pay_title: "Ödəniş",
    pay_summary: "Kurs xülasəsi",
    pay_instructor: "Müəllim",
    pay_customer: "Müştəri məlumatı",
    pay_method: "Ödəniş üsulu",
    pay_card: "Bank kartı",
    pay_card_name: "Kartdakı ad",
    pay_card_number: "Kart nömrəsi",
    pay_expiry: "Bitmə tarixi",
    pay_cvv: "CVV",
    pay_secure: "Bu demo ödənişdir. Kart məlumatı saxlanmır və real əməliyyat aparılmır.",
    pay_submit: "Ödənişi tamamla",
    pay_processing: "Yoxlanılır...",
    pay_success_title: "Ödəniş uğurla tamamlandı!",
    pay_success_lead: "Kursa qoşulma uğurla tamamlandı.",
    pay_amount: "Məbləğ",
    pay_order: "Sifariş nömrəsi",
    pay_date: "Tarix",
    pay_start: "Öyrənməyə başla",
    pay_courses: "Kurslarıma keç",
    pay_fail_title: "Ödəniş alınmadı",
    pay_fail_lead: "Demo rejimində bu kart rədd edildi. Heç bir məbləğ çıxılmayıb.",
    pay_retry: "Yenidən cəhd et",
    pay_err_required: "Bu sahə mütləqdir.",
    pay_err_email: "Düzgün e-poçt daxil edin.",
    pay_err_card: "Kart nömrəsi 16 rəqəm olmalıdır.",
    pay_err_expiry: "Tarixi AA/İİ formatında daxil edin.",
    pay_err_cvv: "CVV 3 və ya 4 rəqəm olmalıdır.",
    pay_demo_hint: "Demo: nömrəsi 0000 ilə bitən kart uğursuz ödəniş göstərir.",
    reg_student: "Tələbə",
    reg_instructor: "Müəllim",
    learn_continue: "Öyrənməyə davam et",
    learn_outline: "Dərslər",
    learn_complete: "Tamamlandı kimi işarələ",
    learn_text: "Dərsi oxuyun, sonra tamamlandı kimi işarələyin. Tərəqqi yalnız bu brauzer önizləməsində qalır.",
    learn_video_note: "Video önizləməsi. Real pleyer dərs ünvanını serverdən alacaq.",
    learn_cert_locked: "Sertifikat bütün dərslər tamamlananda görünür.",
    learn_m1: "Modul 1 · Başlanğıc",
    learn_m2: "Modul 2 · Məşq",
    learn_l1: "Salamlaşma",
    learn_l2: "Dinləmə videosu",
    learn_l3: "Qısa test",
    learn_l4: "Gündəlik ifadələr",
    learn_kind_text: "Mətn",
    learn_kind_video: "Video",
    learn_kind_file: "Fayl",
    learn_kind_quiz: "Test",
    learn_q1: "She ___ a student.",
    learn_q2: "She ___ to the market yesterday.",
    learn_q3: "This is ___ apple.",
    learn_q4: "The book is ___ the table.",
    grade_title: "Qiymət cədvəli",
    grade_lead: "Bu önizləmədə test balları və kurs tərəqqisi.",
    grade_quiz: "Test",
    grade_open: "Qiymət cədvəlini aç",
    grade_empty: "Hələ test balı yoxdur. Test dərsini açın və göndərin.",
    grade_take: "Testi aç",
    plan_nav: "Planlar",
    plan_free: "Pulsuz plan",
    plan_premium: "Premium",
    plan_free_lead: "Hazırda Pulsuz plandasınız.",
    plan_premium_lead: "Bütün Premium imkanlar açıqdır.",
    plan_upgrade: "Premium-a keç",
    plan_manage: "Planı idarə et",
    plan_unlock: "Premium ilə aç",
    plan_monthly: "Aylıq",
    plan_membership: "Üzvlük",
    plan_month: "ay",
    plan_per_month: "aylıq",
    plan_summary: "Üzvlük",
    plan_success: "Premium aktivdir",
    plan_success_lead: "Təbriklər! Premium üzvlüyünüz indi aktivdir.",
    plan_status: "Status",
    plan_active: "Aktiv",
    plan_price: "Qiymət",
    plan_next: "Növbəti ödəniş tarixi",
    plan_feature: "İmkan",
    plan_continue: "Öyrənməyə davam",
    plan_current_lesson: "Cari dərs",
    plan_streak: "Öyrənmə seriyası",
    plan_streak_lock: "Premium ilə əlçatandır.",
    plan_days: "gün",
    plan_longest: "Ən uzun seriya",
    plan_progress: "Öyrənmə tərəqqisi",
    plan_completion: "Ümumi tamamlanma",
    plan_quiz_avg: "Test orta balı",
    plan_lessons_done: "Tamamlanan dərslər",
    plan_hours: "Öyrənmə saatı",
    plan_analytics: "Ətraflı analitika",
    plan_analytics_lock: "Ətraflı analitikanı Premium ilə açın.",
    plan_active_courses: "Aktiv kurslar",
    plan_achievements: "Nailiyyətlər",
    plan_calendar: "Öyrənmə təqvimi",
    plan_calendar_lock: "Təqvim Premium ilə əlçatandır.",
    plan_resources: "Premium materiallar",
    plan_support: "Üstün dəstək",
    plan_free_price: "Pulsuz",
    coupon_have: "Kuponunuz var?",
    coupon_placeholder: "Kupon kodunu yazın",
    coupon_apply: "Tətbiq et",
    coupon_remove: "Kuponu sil",
    coupon_invalid: "Kupon kodu yanlışdır və ya müddəti bitib.",
    coupon_ok: "Kupon uğurla tətbiq olundu",
    coupon_original: "Əsas qiymət",
    coupon_discount: "Endirim",
    coupon_final: "Yekun qiymət",
    coupon_code: "Kupon",
    coupon_total: "Cəmi",
    coupon_off: "ENDİRİM",
    plan_enroll_free: "Pulsuz qoşul",
    offer_title: "Nə əldə edirsiniz",
    offer_free: "Demo kurs",
    course_type_demo: "Demo",
    course_type_standard: "Standard",
    course_type_premium: "Premium",
    course_start_demo: "Demoya başla",
    course_upgrade_standard: "Standarta keç",
    course_upgrade_premium: "Premium-a keç",
    course_locked: "Kilidli dərs",
    course_locked_text: "Bu dərsi açmaq üçün tam kursu alın.",
    course_bought: "Kurs alındı",
    course_bought_text: "Kurs uğurla alındı.",
    course_enrolled: "Qeydiyyat tamamlandı",
    course_enrolled_text: "{courseName} kursuna yazıldınız.",
    offer_demo_lessons: "2 demo dərs",
    offer_demo_video: "1 demo video",
    offer_demo_quiz: "1 demo test",
    offer_preview: "Kurs önizləməsi",
    offer_locked: "Tam dərslər kilidlidir",
    card_limited: "Məhdud məzmun",
    card_full: "Tam kurs",
    card_premium_features: "Premium imkanlar",
    dash_demo_progress: "Demo tərəqqi",
    dash_continue_demo: "Demoya davam et",
    learn_l5: "İkinci demo dərs",
    learn_l6: "Ev tapşırığı",
    learn_kind_homework: "Ev tapşırığı",
    learn_homework_text: "Həftəniz haqqında Present Perfect ilə beş cümlə yazın və tapşırığı göndərin.",
    learn_homework_answer: "Cavabınız",
    learn_homework_submit: "Tapşırığı göndər",
    learn_homework_done: "Bu önizləmə üçün ev tapşırığı tamamlandı.",
    video_my_notes: "Qeydlərim",
    video_add_note: "Qeyd əlavə et",
    video_edit_note: "Redaktə et",
    video_delete_note: "Sil",
    video_note_placeholder: "Bu an üçün qeyd yazın…",
    video_notes_empty: "Hələ qeyd yoxdur. Dayandırın və vaxt möhürü ilə qeyd əlavə edin.",
    video_bookmarks: "Əlfəcinlər",
    video_add_bookmark: "Əlfəcin əlavə et",
    video_remove_bookmark: "Əlfəcini sil",
    video_bookmarks_empty: "Hələ əlfəcin yoxdur.",
    video_resume_at: "Buradan davam et",
    video_play: "Oynat",
    video_seek: "Axtarış",
    video_volume: "Səs",
    video_fullscreen: "Tam ekran",
    video_duration_label: "Müddət",
    video_course_progress: "Kurs tərəqqisi",
    tp_title: "Müəllim abunəliyi",
    tp_compare: "Müəllim planlarını müqayisə et",
    tp_lead: "MF Language Academy-də kurs dərc etmək üçün plan seçin. Yalnız demo ödəniş.",
    tp_current: "Cari müəllim planı",
    tp_free: "Pulsuz müəllim",
    tp_standard: "Standard müəllim",
    tp_premium: "Premium müəllim",
    tp_current_btn: "Cari plan",
    tp_switch: "Planı dəyiş",
    tp_upgrade_standard: "Standarta keç",
    tp_upgrade_premium: "Premium-a keç",
    tp_limit_reached: "Pulsuz müəllim limitinizə çatdınız.",
    tp_courses_used: "İstifadə olunan kurslar",
    tp_lessons_limit: "Kurs üzrə dərslər",
    tp_students_used: "Tələbələr",
    tp_earnings: "Müəllim gəliri",
    tp_earnings_note: "Mock önizləmə məlumatı. Real maliyyə məlumatı deyil.",
    tp_total_sales: "Ümumi satış",
    tp_teacher_share: "Müəllim gəliri",
    tp_platform_share: "Platforma komissiyası",
    tp_courses_sold: "Satılan kurslar",
    tp_this_month: "Bu ay",
    tp_commission_rate: "Komissiya dərəcəsi",
    tp_feat_1_course: "1 kurs",
    tp_feat_limited_lessons: "Məhdud dərslər",
    tp_feat_limited_students: "Məhdud tələbələr",
    tp_feat_basic_analytics: "Əsas analitika",
    tp_feat_publish: "Kurs dərc etmək olar",
    tp_feat_10_courses: "10 kursadək",
    tp_feat_more_lessons: "Daha çox dərs",
    tp_feat_more_students: "Daha çox tələbə",
    tp_feat_analytics: "Kurs analitikası",
    tp_feat_students: "Tələbə idarəetməsi",
    tp_feat_unlimited_courses: "Daha yüksək/limitsiz kurs limiti",
    tp_feat_advanced_analytics: "Ətraflı analitika",
    tp_feat_advanced_ai: "Ətraflı AI",
    tp_feat_premium_resources: "Premium materiallar",
    tp_feat_priority: "Üstün dəstək",
    tp_note_upgraded: "Müəllim abunəliyi yeniləndi",
    tp_note_upgraded_text: "Müəllim planınız uğurla yeniləndi.",
    reward_title: "Mükafatlar",
    reward_lead: "Öyrəndikcə XP və MF Points qazanın.",
    reward_xp: "XP-niz",
    reward_level: "Cari səviyyə",
    reward_next_level: "Növbəti səviyyəyə tərəqqi",
    reward_max_level: "Maksimum səviyyəyə çatdınız",
    reward_mf_points: "MF Points",
    reward_points_note: "Ballar sonra endirim kuponuna çevrilə bilər. Yalnız demo.",
    reward_great: "Əla iş!",
    reward_homework: "Ev tapşırığı mükafatları",
    reward_homework_lead: "Öyrənmə səhifəsində ev tapşırığını tamamlayaraq +50 XP və +20 MF Points qazanın.",
    reward_homework_done: "Ev tapşırığı tamamlandı!",
    reward_lesson_done: "Dərs tamamlandı!",
    reward_quiz_done: "Test tamamlandı!",
    reward_course_done: "Kurs tamamlandı!",
    reward_unlocked: "AÇILDI",
    reward_locked: "KİLİDLİ",
    reward_level_up: "Yeni səviyyəyə çatdınız!",
    reward_level_1: "Beginner",
    reward_level_2: "Learner",
    reward_level_3: "Active Student",
    reward_level_4: "Language Explorer",
    reward_level_5: "Language Master",
    reward_ach_unlocked: "Nailiyyət açıldı",
    reward_ach_homework_hero: "Homework Hero",
    reward_ach_quiz_master: "Quiz Master",
    reward_ach_streak_7: "7 Day Streak",
    reward_ach_course_champion: "Course Champion",
    reward_ach_fast_learner: "Fast Learner",
    reward_xp_title: "XP qazandınız",
    reward_xp_lesson: "Dərs tamamlandı! +20 XP",
    reward_xp_homework: "Ev tapşırığı tamamlandı! +50 XP",
    reward_xp_quiz: "Test tamamlandı! +50 XP",
    reward_xp_course: "Kurs tamamlandı! +200 XP",
    reward_points_title: "MF Points",
    reward_points_homework: "20 MF Points qazandınız.",
    reward_points_quiz: "30 MF Points qazandınız.",
    reward_points_course: "100 MF Points qazandınız.",
    course_complete_title: "Kurs 100% tamamlandı",
    course_complete_text: "Təbriklər! {courseName} kursunu tamamladınız və sertifikat qazandınız.",

    course_price_required: "Standart və Premium üçün qiymət rəqəm olmalıdır.",
    offer_written: "Yazılı dərs məzmunu",
    offer_resume: "Qaldığınız yerdən davam",
    offer_reviews: "Rəylər və qiymətlər",
    course_type: "Kurs növü",
    course_status: "Status",
    course_draft: "Qaralama",
    course_published: "Dərc olunub",
    course_preview: "Önizləmə",
    course_preview_on: "Açıq",
    course_preview_off: "Bağlı",
    plan_type_demo: "Demo",
    plan_type_standard: "Standard",
    offer_premium: "Premium kurs",
    offer_access: "Demo girişi",
    offer_basic_video: "Əsas video dərslər",
    offer_basic_quiz: "Əsas testlər",
    offer_basic_progress: "Əsas tərəqqi",
    offer_complete: "Kursu tamamlama",
    offer_standard_cert: "Standart sertifikat",
    offer_community: "İcma dəstəyi",
    offer_full: "Tam kurs girişi",
    offer_videos: "Tam video dərslər",
    offer_files: "Yüklənən materiallar",
    offer_analytics: "Ətraflı analitika",
    offer_streak: "Öyrənmə seriyası",
    offer_badges: "Nailiyyətlər",
    offer_calendar: "Öyrənmə təqvimi",
    offer_certificate: "Premium sertifikat",
    offer_ai: "Ətraflı AI dəstəyi",
    offer_exclusive: "Xüsusi məzmun",
    offer_support: "Üstün dəstək",
    offer_coupon: "Endirim kuponu",
    plan_type: "Növ",
    plan_type_all: "Bütün kurslar",
    plan_type_free: "Demo",
    plan_type_premium: "Premium kurslar",
    plan_badge_free: "Demo",
    plan_badge_premium: "Premium",
    plan_badge_first: "İlk kurs",
    plan_badge_quiz: "İlk test",
    plan_badge_done: "Kurs tamamlandı",
    plan_badge_master: "Test ustası",
    plan_badge_streak: "7 günlük seriya",
    plan_course_lock: "Premium kurs",
    plan_course_lock_text: "Bu kurs Premium üzvlüklə açılır.",
    plan_ai: "Premium AI köməkçi",
    plan_row_free_courses: "Demo kurslar",
    plan_row_premium_courses: "Premium kurslar",
    plan_row_basic: "Əsas tərəqqi",
    plan_event_lesson: "Növbəti dərs · sabah 18:00",
    plan_event_quiz: "Qısa test · cümə",
    plan_event_study: "Məşq sessiyası · 25 dəqiqə",
    plan_event_live: "Canlı dərs · şənbə",
    plan_note_active: "Premium aktivdir",
    plan_note_active_text: "Təbriklər! Premium üzvlüyünüz indi aktivdir.",
    plan_note_unlocked: "Premium imkan açıldı",
    plan_note_unlocked_text: "Analitika, seriya və təqvim indi açıqdır.",
    ai_premium: "Premium təklif: bu gün 20 dəqiqə oxuyun, dünənki testi təkrarlayın, sonra İngilis A1 dərs 21-ə davam edin.",
    studio_open: "Kurs studiyası",
    studio_title: "Kurs studiyası",
    studio_lead: "Kurs planını brauzerdə qurun. Serverə heç nə yazılmır.",
    studio_details: "Kurs məlumatı",
    studio_course_title: "Kurs adı",
    studio_description: "Təsvir",
    studio_thumb: "Şəkil",
    studio_subject: "Fənn",
    studio_module: "Modul",
    studio_module_title: "Modul adı",
    studio_add_module: "Modul əlavə et",
    studio_add_lesson: "Dərs əlavə et",
    studio_lesson: "Dərs",
    studio_remove: "Sil",
    studio_quiz: "Test",
    studio_preview: "Önizləmə",
    studio_question: "Sual",
    studio_answers: "Cavablar, | ilə ayırın",
    studio_correct: "Düzgün cavabın nömrəsi",
    studio_add_question: "Sual əlavə et",
    studio_saved: "Plan yalnız bu önizləmədə yeniləndi.",
    apply_country: "Ölkə",
    apply_education: "Təhsil",
    apply_institution: "Universitet / müəssisə",
    apply_experience: "Müəllimlik təcrübəsi",
    apply_years: "Təcrübə ili",
    apply_languages: "Dillər",
    apply_bio: "Qısa bioqrafiya",
    apply_portfolio: "LinkedIn / portfolio ünvanı",
    apply_photo: "Profil şəkli",
    apply_cv: "CV / rezume PDF",
    apply_upload_photo: "Şəkil seçin",
    apply_upload_photo_hint: "İstəyə görə",
    apply_upload_cv: "PDF CV yüklə",
    apply_upload_cv_hint: "Yalnız PDF faylı",
    apply_change: "Dəyiş",
    apply_remove: "Sil",
    apply_cv_required: "PDF formatında CV yükləyin.",
    apply_cv_pdf: "CV yalnız PDF olmalıdır.",
    apply_submitted: "Müraciət göndərildi",
    apply_submitted_text: "Müəllim müraciətiniz qəbul olundu. Komandamız məlumatlarınızı və CV-nizi yoxlayacaq.",
    apply_status: "Status",
    apply_pending: "Baxış gözləyir",
    apply_approved: "Təsdiqlənib",
    apply_rejected: "Rədd edilib",
    apply_admin: "Müəllim müraciətləri",
    apply_details: "Müraciət detalları",
    apply_view: "Bax",
    apply_preview: "CV-yə bax",
    apply_download: "CV-ni yüklə",
    apply_empty: "Hələ müəllim müraciəti yoxdur.",
    apply_cv_session: "CV önizləməsi yükləndiyi brauzer sessiyasında açılır.",
    apply_reason: "Rədd səbəbi",
    apply_approve: "Təsdiqlə",
    apply_reject: "Rədd et",
    apply_note_submitted: "Müraciət göndərildi",
    apply_note_submitted_text: "Müəllim müraciətiniz baxış gözləyir.",
    apply_note_approved: "Müraciət təsdiqləndi",
    apply_note_approved_text: "Müəllim müraciətiniz təsdiqləndi.",
    apply_note_rejected: "Müraciət rədd edildi",
    apply_note_rejected_text: "Müəllim müraciətiniz rədd edildi.",
    apply_status_pending: "Müəllim müraciətiniz hazırda yoxlanılır.",
    apply_status_approved: "Müəllim müraciətiniz təsdiqləndi. Müəllim alətləri önizləmə kimi açıq qalır.",
    apply_status_rejected: "Müəllim müraciətiniz rədd edildi.",
    search_all: "bütün kurslar",
    duration_8: "8 həftə",
    duration_10: "10 həftə",
    lessons_32: "32 dərs",
    lessons_20: "20 canlı dərs",
    lessons_16: "16 canlı dərs",
    course_a1_title: "İngilis A1 — tam başlanğıc kursu",
    course_a1_summary: "Rəhbərli danışıq, gündəlik lüğət və həmin gün istifadə edəcəyiniz aydın qrammatika ilə ingilis dilinə sıfırdan başlayın.",
    course_a1_overview: "Bu başlanğıc yolu sizi ilk salamdan qısa gündəlik söhbətlərə aparır. Hər modul video, oxu və qısa testdən ibarətdir. Dərslər tələffüz və gündəlik vəziyyətlər üzərində qurulub.",
    learn_intro_en: "İngilis dilində özünüzü təqdim edin",
    learn_listen: "Sadə söhbətləri anlayın",
    learn_vocab: "Gündəlik lüğət yığın",
    learn_grammar: "Əsas qrammatikadan istifadə edin",
    learn_pronounce: "Tələffüzü yaxşılaşdırın",
    learn_daily: "Gündəlik vəziyyətlərdə danışın",
    course_mid_summary: "Ehtiyatlı cümlələrdən axıcı müzakirəyə keçin. Fikir, hekayə və iş ingiliscəsi üzərində işləyəcəksiniz.",
    course_mid_overview: "Bu səviyyədə əsaslar artıq məlumdur. Kurs müzakirə, qısa yazı və real dinləmə ilə dəqiqliyi və axıcılığı artırır.",
    course_de_summary: "Praktik dialoqlar, aydın qrammatika və etibarlı tələffüzlə alman dilinə başlayın.",
    course_es_summary: "İlk dərsdən danışa biləcəyiniz ispan dilini öyrənin. Hər mövzuda mədəniyyət qeydləri var.",
    course_fr_summary: "Fransız dilinə səmimi başlanğıc: tələffüz məşqi və səyahət, təhsil üçün söhbətlər.",
    course_biz_summary: "Görüş, təqdimat və peşəkar e-poçtda aydın və inandırıcı səslənin.",
    course_ielts_summary: "Akademik IELTS üçün vaxtlı tapşırıqlar, bal yönümlü rəy və hər bölmə üçün strategiya.",
    role_maya: "Akademik koordinator",
    label_remember: "Məni xatırla",
    btn_create: "Hesab yarat",
    btn_go_login: "Girişə keç",
    empty_courses: "Axtarışa uyğun kurs yoxdur.",
    empty_results: "Nəticə yoxdur",
    pager_prev: "Əvvəlki",
    pager_next: "Növbəti",
    label_sort: "Sırala",
    label_level: "Səviyyə",
    label_language: "Dil",
    label_price: "Qiymət",
    price_free: "Pulsuz",
    btn_preview: "Önizləmə",
    btn_play_preview: "Önizləməni oynat",
    btn_submit_review: "Rəyi göndər",
    label_your_name: "Adınız",
    label_your_review: "Rəyiniz",
    label_rating: "Qiymət",
    err_message_short: "Ən azı 10 simvol yazın.",
    err_name_required: "Ad tələb olunur.",
    err_email_required: "E-poçt tələb olunur.",
    err_email_invalid: "Düzgün e-poçt ünvanı daxil edin.",
    err_phone_required: "Telefon tələb olunur.",
    err_phone_invalid: "Düzgün telefon nömrəsi daxil edin.",
    err_password_required: "Şifrə tələb olunur.",
    err_password_short: "Ən azı 8 simvol istifadə edin.",
    err_first_required: "Ad tələb olunur.",
    err_last_required: "Soyad tələb olunur.",
    err_subject_required: "Mövzu tələb olunur.",
    err_message_required: "Mesaj tələb olunur.",
    err_bio_required: "Haqqınızda məlumat tələb olunur.",
    err_confirm_required: "Şifrəni təsdiqləyin.",
    err_confirm_mismatch: "Şifrələr uyğun gəlmir.",
    profile_password_hint: "Bu önizləmədə boş saxlayın",
    profile_bio_value: "Həftədə üç axşam başlanğıc ingilis dili öyrənirəm.",
    search_catalog: "Kataloqda axtar",
    search_instructors: "Təlimçi axtar",
    search_students: "Tələbə axtar",
    search_articles: "Məqalə axtar",
    password_hint: "Ən azı 8 simvol",
    contact_subject_hint: "Kurs və ya sual",
    contact_message_hint: "Məqsədinizi və uyğun cədvəli yazın",
    review_hint: "Nə öyrəndiniz?",
    label_confirm: "Şifrəni təsdiqlə",
    auth_new: "Yeni tələbə",
    auth_back: "Sayta qayıt",
    auth_login_hint: "Bu önizləmə yalnız formanı yoxlayır. Giriş etmir.",
    auth_login_ready: "Məlumat yoxlanıldı",
    auth_login_ready_text: "Bu önizləmə hesabı açmır və sizi idarə panelinə keçirmir. Hesaba kimin girəcəyini sonra server müəyyən edəcək.",
    auth_register_note: "Məlumatlarınızı doldurun. Forma onları yerində yoxlayır və hesab yaratmır.",
    auth_register_aside: "Tələbə profili yaradın, sonra səviyyənizə və cədvəlinizə uyğun kurs seçin.",
    auth_email_checked: "E-poçt yoxlanıldı",
    auth_reset_note: "E-poçtunuzu daxil edin. Bu önizləmə yalnız formatı yoxlayır.",
    language_menu: "Dil seçimi",
    toggle_theme: "İşıqlı və qaranlıq rejimi dəyiş",
    theme_light: "İşıqlı rejim aktivdir",
    theme_dark: "Qaranlıq rejim aktivdir"
  },
  ru: {
    nav_home: "Главная",
    nav_about: "О нас",
    nav_courses: "Курсы",
    nav_teachers: "Преподаватели",
    nav_students: "Студенты",
    nav_contact: "Контакты",
    nav_login: "Войти",
    nav_register: "Регистрация",
    search_placeholder: "Поиск курсов",
    search_clear: "Очистить поиск",
    search_none_title: "Курсы не найдены",
    search_none_lead: "Нет курсов по запросу",
    search_none_try: "Попробуйте другой запрос.",
    search_none_filters: "Нет курсов по этим фильтрам.",
    search_showing_all: "Показаны все курсы",
    search_course_one: "курс",
    search_course_many: "курсов",
    search_courses_found: "курсов найдено",
    search_showing: "Показано",
    search_of: "из",
    search_go: "Поиск",
    page_missing: "Страница не найдена",
    page_missing_text: "Такой страницы нет.",
    open_menu: "Открыть меню",
    close_menu: "Закрыть меню",
    slider_prev_courses: "Предыдущие курсы",
    slider_next_courses: "Следующие курсы",
    slider_prev_stories: "Предыдущие отзывы",
    slider_next_stories: "Следующие отзывы",
    back_to_top: "Наверх",
    skip_content: "К содержанию",
    footer_quick: "Быстрые ссылки",
    footer_contact: "Контактная информация",
    footer_social: "Соцсети",
    footer_catalog: "Полный каталог",
    social_facebook: "Facebook",
    social_instagram: "Instagram",
    social_linkedin: "LinkedIn",
    social_youtube: "YouTube",
    btn_explore: "Смотреть курсы",
    btn_start: "Начать",
    btn_view_course: "Открыть курс",
    btn_browse: "Все курсы",
    btn_more_about: "Подробнее о нас",
    btn_view_profile: "Смотреть профиль",
    btn_start_learning: "Начать обучение",
    btn_subscribe: "Подписаться",
    btn_send: "Отправить",
    btn_enroll: "Записаться",
    btn_write_review: "Написать отзыв",
    btn_browse_catalog: "Открыть каталог",
    btn_contact_school: "Связаться со школой",
    btn_view_path: "Смотреть путь",
    btn_read_more: "Подробнее",
    btn_save: "Сохранить",
    btn_reset: "Отправить ссылку",
    btn_forgot: "Забыли пароль?",
    dash_logout: "Выйти",
    hero_eyebrow: "Современная языковая школа",
    hero_title: "Учите языки. Открывайте двери.",
    hero_lead: "Развивайте языковые навыки с профессиональными преподавателями и современными методами.",
    hero_small: "Небольшие группы",
    hero_certified: "Сертифицированные преподаватели",
    hero_online: "Онлайн и в кампусе",
    hero_active: "Активных студентов",
    hero_rating: "Средняя оценка",
    courses_eyebrow: "Популярные курсы",
    courses_title: "Популярные курсы",
    course_en_beginner: "Английский — начальный",
    course_en_intermediate: "Английский — средний",
    course_ielts: "Подготовка к IELTS",
    course_business: "Деловой английский",
    course_german: "Немецкий язык",
    course_spanish: "Испанский язык",
    course_french: "Французский — начальный",
    about_eyebrow: "О нас",
    about_title: "О MF Language Academy",
    why_eyebrow: "Почему мы",
    why_title: "Школа, построенная вокруг речи",
    feat_teachers: "Опытные преподаватели",
    feat_schedule: "Гибкое расписание",
    feat_online: "Онлайн-обучение",
    feat_certificate: "Сертификат",
    feat_small: "Небольшие группы",
    feat_materials: "Современные материалы",
    teachers_title: "Учитесь у тех, кто преподаёт каждый день",
    stat_years: "Лет опыта",
    testimonials_eyebrow: "Отзывы",
    testimonials_title: "Что говорят студенты после занятия",
    cta_title: "Готовы начать обучение?",
    newsletter_eyebrow: "Рассылка",
    newsletter_title: "Новости курсов на почту",
    newsletter_success: "Вы в списке",
    label_email: "Эл. почта",
    label_password: "Пароль",
    label_phone: "Телефон",
    label_name: "Имя",
    label_subject: "Тема",
    label_message: "Сообщение",
    label_first: "Имя",
    label_last: "Фамилия",
    label_full_name: "Полное имя",
    label_bio: "О себе",
    label_languages: "Языки",
    label_new_password: "Новый пароль",
    dash_home: "Панель",
    dash_my_courses: "Мои курсы",
    dash_messages: "Сообщения",
    dash_profile: "Профиль",
    dash_settings: "Настройки",
    dash_hello: "Рады вас видеть",
    dash_welcome: "С возвращением, Maya",
    dash_snapshot: "Краткий обзор курсов, студентов и сообщений. Цифры на этом экране — пример.",
    dash_active_courses: "Активные курсы",
    dash_open_messages: "Открытые сообщения",
    dash_my_courses_stat: "Мои курсы",
    dash_completed: "Завершено",
    dash_progress: "В процессе",
    dash_certificates: "Сертификаты",
    auth_welcome: "С возвращением на занятие.",
    auth_welcome_text: "Продолжите курсы, сообщения и прогресс в учебном портале.",
    auth_aside: "Небольшие группы. Живые разговоры. Бостон и онлайн.",
    auth_portal: "Портал",
    auth_login_note: "Используйте любой корректный email и пароль от 8 символов. Этот просмотр не проверяет аккаунт.",
    auth_register_title: "Начните с ясного плана.",
    auth_reset: "Сброс пароля",
    courses_page_title: "Найдите курс под свою цель",
    filter_all: "Все",
    lang_english: "Английский",
    filter_exam: "Подготовка к экзамену",
    filter_business: "Бизнес",
    filter_german: "Немецкий",
    filter_spanish: "Испанский",
    filter_french: "Французский",
    level_beginner: "Начальный",
    level_intermediate: "Средний",
    level_advanced: "Продвинутый",
    level_upper: "Выше среднего",
    filter_online: "Онлайн",
    filter_offline: "Очно",
    filter_speaking: "Говорение",
    filter_vocab: "Лексика",
    badge_exam: "Экзамен",
    teachers_eyebrow: "Преподаватели",
    teachers_page_title: "Преподаватели, которые любят класс",
    teachers_cta: "Хотите преподавать с нами?",
    students_eyebrow: "Студенческая жизнь",
    students_title: "Те, кому есть зачем говорить",
    students_stories: "Истории",
    students_highlights: "Недавние успехи студентов",
    students_clubs: "Учебные клубы",
    students_checks: "Проверки прогресса",
    contact_title: "Связаться с языковой школой",
    contact_faq: "Вопросы до записи",
    contact_help: "Помощь до письма",
    paths_crumb: "Учебные пути",
    paths_lead: "Путь от первых приветствий до экзамена или рабочего английского.",
    paths_how: "Как это работает",
    paths_steps: "Четыре шага к сертификату",
    paths_step1: "1. Выберите курс",
    paths_step1_text: "Выберите уровень и цель в каталоге.",
    paths_step2: "2. Запишитесь",
    paths_step2_text: "Отправьте заявку со страницы курса.",
    paths_step3: "3. Учитесь и практикуйтесь",
    paths_step3_text: "Смотрите уроки, читайте заметки и проходите тесты.",
    paths_step4: "4. Получите сертификат",
    paths_step4_text: "Завершите путь и сохраните сертификат.",
    path_beginner: "Начальный английский",
    path_beginner_text: "Начните с приветствий, звуков и бытовых фраз.",
    path_intermediate: "Средний английский",
    path_intermediate_text: "Более длинные разговоры и более ясные письма.",
    path_advanced: "Продвинутый английский",
    path_advanced_text: "Обсуждайте сложные темы точнее.",
    faq_title: "Частые вопросы",
    events_crumb: "События",
    events_title: "События и мастерские",
    blog_crumb: "Блог",
    blog_title: "Учебные статьи",
    blog_featured: "Избранное",
    blog_speaking_title: "Как улучшить разговорный английский",
    blog_speaking_text: "Короткая ежедневная речь полезнее долгого молчаливого чтения. Каждый день — одна реальная ситуация.",
    instructors_crumb: "Преподаватели",
    instructors_lead: "Основная страница преподавателей остаётся. Этот список добавляет оценки и ссылки на профили.",
    notes_title: "Уведомления",
    notes_lead: "Непрочитанные выделены. Нажмите, чтобы отметить как прочитанное.",
    mark_all_read: "Отметить все прочитанными",
    view_all_notifications: "Все уведомления",
    no_notifications: "Новых уведомлений нет",
    notifications_caught_up: "Вы всё просмотрели.",
    open_notifications: "Уведомления",
    notify_filter_unread: "Непрочитанные",
    notification_new_course: "Добавлен новый курс",
    notification_new_course_message: "Новый курс уже доступен.",
    notification_new_lesson: "Доступен новый урок",
    notification_new_lesson_message: "В ваш курс добавлен новый урок.",
    notification_quiz_result: "Результат теста готов",
    notification_quiz_result_message: "Результат теста можно посмотреть.",
    notification_certificate: "Сертификат готов",
    notification_certificate_message: "Поздравляем! Сертификат готов.",
    cert_congrats_title: "Поздравляем",
    cert_congrats_message: "Поздравляем! Вы завершили курс «{courseName}» и получили сертификат.",
    cert_title: "Сертификат об окончании",
    cert_my: "Мои сертификаты",
    cert_view: "Открыть сертификат",
    cert_download: "Скачать сертификат",
    cert_print: "Печать сертификата",
    cert_id: "Номер сертификата",
    cert_completed_on: "Дата завершения",
    cert_instructor: "Преподаватель",
    cert_none_title: "Сертификатов пока нет",
    cert_none_text: "Завершите курс, чтобы получить первый сертификат.",
    cert_awarded: "Сертификат вручается",
    cert_for: "за успешное окончание курса",
    cert_back: "Назад к урокам",
    cert_missing: "Сертификат не найден",
    cert_sign_role: "Академический директор",
    course_en_a2: "Английский A2",
    cert_date_en_a2: "30 сентября 2026",
    course_en_a2_progress: "Завершено · 100%",
    quiz_notify_title: "Регистрация прошла успешно!",
    quiz_notify_text: "Пройдите бесплатный тест по английскому и узнайте примерный уровень.",
    quiz_notify_btn: "Пройти тест",
    quiz_close: "Закрыть",
    quiz_title: "Тест уровня английского",
    quiz_lead: "Это короткий демонстрационный тест. Результат не является официальным сертификатом CEFR.",
    quiz_progress: "Вопрос {current} из {total}",
    quiz_previous: "Назад",
    quiz_next: "Далее",
    quiz_submit: "Отправить",
    quiz_choose: "Выберите ответ, чтобы продолжить.",
    quiz_result_title: "Результат теста",
    quiz_score_label: "Балл",
    quiz_level_label: "Примерный уровень",
    quiz_demo_note: "Это примерный демонстрационный результат. Это не официальный сертификат CEFR.",
    quiz_recommend: "Рекомендуемые курсы",
    quiz_no_courses: "Для этого уровня пока нет подходящего курса.",
    quiz_level_a1: "A1 — Начальный",
    quiz_level_a2: "A2 — Элементарный",
    quiz_level_b1: "B1 — Средний",
    quiz_level_b2: "B2 — Выше среднего",
    quiz_level_c1: "C1 — Продвинутый",
    notification_enrollment: "Запись прошла успешно",
    notification_enrollment_message: "Вы успешно записались на курс.",
    notification_new_student: "Записался новый студент",
    notification_new_student_message: "На ваш курс записался новый студент.",
    notification_announcement: "Новое объявление",
    notification_announcement_message: "Новое объявление от MF Language Academy.",
    time_just_now: "Только что",
    time_5_minutes: "5 минут назад",
    time_20_minutes: "20 минут назад",
    time_1_hour: "1 час назад",
    time_yesterday: "Вчера",
    note_lesson: "Опубликован новый урок",
    note_lesson_text: "Английский A1 · Урок 03 готов.",
    note_quiz: "Результат теста",
    note_quiz_text: "Проверка знакомства · 9/10.",
    note_cert: "Сертификат готов",
    note_cert_text: "Сертификат начального испанского можно посмотреть.",
    note_announce: "Объявление преподавателя",
    note_announce_text: "Sarah Johnson перенесла понедельничную практику на 18:00.",
    status_unread: "Не прочитано",
    status_read: "Прочитано",
    profile_title: "Профиль и настройки",
    profile_lead: "Эту форму позже смогут использовать студент или преподаватель. На сервер ничего не сохраняется.",
    profile_role: "Предпросмотр студенческого аккаунта",
    faq_crumb: "Вопросы",
    tab_description: "Описание",
    tab_outcomes: "Чему вы научитесь",
    course_description: "Описание курса",
    course_included: "Включено",
    course_includes: "В этот курс входит",
    include_lifetime: "Доступ без срока",
    include_certificate: "Сертификат об окончании",
    include_devices: "Доступ с телефона и компьютера",
    course_curriculum: "Программа",
    course_modules: "Модули, уроки и тесты",
    course_before: "Перед стартом",
    course_requirements: "Требования",
    req_none: "Предыдущие знания английского не нужны.",
    req_computer: "Рекомендуются базовые навыки работы с компьютером.",
    req_internet: "Нужно подключение к интернету.",
    req_watch: "Студент должен смотреть видеоуроки и проходить тесты.",
    course_demo: "Демо-данные",
    course_progress: "Прогресс курса",
    course_progress_note: "Эта полоса — статичный пример, пока аккаунт студента не подключён.",
    course_instructor: "Преподаватель",
    course_sarah: "Учитесь с Sarah Johnson",
    role_sarah: "Преподаватель английского языка",
    course_reviews: "Отзывы",
    course_reviews_title: "Что говорят ученики",
    course_faq_title: "Вопросы перед записью",
    faq_beginners: "Курс подходит новичкам?",
    faq_access: "Как долго открыт доступ к курсу?",
    faq_certificate: "Я получу сертификат?",
    faq_mobile: "Можно учиться с телефона?",
    faq_mobile_answer: "Да. Уроки рассчитаны и на телефон, и на компьютер.",
    faq_quizzes: "Есть тесты?",
    faq_quizzes_answer: "Каждый модуль заканчивается коротким тестом на новые фразы.",
    faq_previous: "Нужен ли английский заранее?",
    faq_previous_answer: "Для этого начального курса предыдущие знания английского не нужны.",
    related_eyebrow: "Похожие курсы",
    related_title: "Продолжение после A1",
    course_a2: "Английский A2",
    course_a2_text: "Более длинные разговоры и более ясное повседневное письмо.",
    course_ielts_card: "Практика на время: аудирование, чтение, письмо и говорение.",
    course_speaking: "Разговорный английский",
    course_speaking_text: "Мастерская, где главное — более длинные реплики.",
    price_per_course: "за курс",
    role_elena: "Руководитель программы английского",
    role_daniel: "Преподаватель IELTS",
    role_sophie: "Преподаватель испанского",
    role_markus: "Преподаватель немецкого",
    role_aiko: "Тренер по разговору",
    btn_close: "Закрыть",
    faq_label: "FAQ",
    faq_open: "Помощь и вопросы",
    ai_title: "MF ИИ-помощник",
    ai_subtitle: "Чем я могу помочь?",
    ai_welcome: "Здравствуйте! Чем помочь с изучением английского?",
    ai_placeholder: "Спросите что-нибудь...",
    ai_send: "Отправить",
    ai_typing: "ИИ печатает...",
    ai_open: "Открыть ИИ-помощника",
    ai_hello: "Здравствуйте! Добро пожаловать в MF Language Academy. Чем помочь сегодня?",
    ai_help: "Я могу помочь с грамматикой, словарём, говорением и письмом.",
    ai_present: "Present perfect связывает прошлое действие с настоящим. Например: I have finished my homework.",
    ai_demo: "Сейчас я в демо-режиме. Настоящий ИИ-помощник позже будет подключён через сервер.",
    support_label: "Поддержка",
    faq_courses_certs: "Вопросы о курсах и сертификатах",
    faq_browse: "Смотреть курсы",
    faq_learning: "Обучение",
    faq_quiz: "Тесты и оценки",
    faq_contact_support: "Связаться с поддержкой",
    faq_cat_courses: "Курсы",
    faq_cat_lessons: "Уроки",
    faq_cat_quizzes: "Тесты",
    faq_cat_certs: "Сертификаты",
    faq_cat_account: "Аккаунт",
    faq_cat_tech: "Техническая поддержка",
    faq_q_enroll: "Как записаться на курс?",
    faq_a_enroll: "Выберите курс в каталоге, откройте страницу курса и нажмите «Записаться».",
    faq_q_view: "Как открыть свой курс?",
    faq_a_view: "Откройте страницу курса или продолжите на странице урока. Последний урок остаётся выбранным в списке.",
    faq_q_access: "Как долго открыт доступ к курсу?",
    faq_a_access: "В этом просмотре срок указан на странице курса. После подключения аккаунта он будет храниться там.",
    faq_q_continue: "Как продолжить с места остановки?",
    faq_a_continue: "Откройте страницу урока. В списке слева выбран последний урок — нажмите его и продолжайте.",
    faq_q_complete: "Как отметить урок пройденным?",
    faq_a_complete: "На странице урока нажмите «Отметить выполненным». Это только экранное превью.",
    faq_q_quiz: "Как работают тесты?",
    faq_a_quiz: "На странице урока откройте короткий тест, выберите ответ и нажмите «Отправить». Результат появится на той же странице.",
    faq_q_score: "Где посмотреть балл?",
    faq_a_score: "Балл виден в журнале вверху страницы урока. Ссылка «Тесты и оценки» открывает это место.",
    faq_q_cert_when: "Когда я получу сертификат?",
    faq_a_cert_when: "Сертификат об окончании готов, когда уроки и тесты курса завершены.",
    faq_q_cert_where: "Где смотреть сертификаты?",
    faq_a_cert_where: "Откройте ссылку «Сертификаты». На странице видны имя, курс, преподаватель, дата и номер.",
    faq_q_profile: "Как обновить профиль?",
    faq_a_profile: "На странице профиля измените имя, контакты и поле «О себе», затем сохраните.",
    faq_q_password: "Как сменить пароль?",
    faq_a_password: "На странице профиля заполните поле нового пароля. Этот просмотр не отправляет пароль на сервер.",
    faq_q_lesson_fail: "Что делать, если урок не открывается?",
    faq_a_lesson_fail: "Обновите страницу или попробуйте другой браузер. Если не помогло, напишите через форму контактов.",
    faq_q_contact: "Как связаться с поддержкой?",
    faq_a_contact: "Заполните форму на странице контактов или напишите на hello@mflanguage.academy.",
    aria_breadcrumb: "Навигационная цепочка",
    aria_primary: "Основное меню",
    show_password: "Показать пароль",
    hide_password: "Скрыть пароль",
    enroll_requested: "Заявка отправлена",
    pay_title: "Оплата",
    pay_summary: "О курсе",
    pay_instructor: "Преподаватель",
    pay_customer: "Данные покупателя",
    pay_method: "Способ оплаты",
    pay_card: "Банковская карта",
    pay_card_name: "Имя на карте",
    pay_card_number: "Номер карты",
    pay_expiry: "Срок действия",
    pay_cvv: "CVV",
    pay_secure: "Это демо-оплата. Данные карты не сохраняются и реальный платёж не проводится.",
    pay_submit: "Завершить оплату",
    pay_processing: "Проверка...",
    pay_success_title: "Оплата прошла успешно!",
    pay_success_lead: "Запись на курс успешно завершена.",
    pay_amount: "Сумма",
    pay_order: "Номер заказа",
    pay_date: "Дата",
    pay_start: "Начать обучение",
    pay_courses: "К моим курсам",
    pay_fail_title: "Оплата не прошла",
    pay_fail_lead: "В демо-режиме эта карта отклонена. Списание не выполнялось.",
    pay_retry: "Попробовать снова",
    pay_err_required: "Это поле обязательно.",
    pay_err_email: "Введите корректную почту.",
    pay_err_card: "Номер карты должен содержать 16 цифр.",
    pay_err_expiry: "Введите срок в формате ММ/ГГ.",
    pay_err_cvv: "CVV должен содержать 3 или 4 цифры.",
    pay_demo_hint: "Демо: карта, оканчивающаяся на 0000, показывает неуспешную оплату.",
    reg_student: "Студент",
    reg_instructor: "Преподаватель",
    learn_continue: "Продолжить обучение",
    learn_outline: "Уроки",
    learn_complete: "Отметить выполненным",
    learn_text: "Прочитайте урок и отметьте его выполненным. Прогресс хранится только в этом превью.",
    learn_video_note: "Превью видео. Настоящий плеер получит адрес урока с сервера.",
    learn_cert_locked: "Сертификат появится, когда все уроки будут завершены.",
    learn_m1: "Модуль 1 · Начало",
    learn_m2: "Модуль 2 · Практика",
    learn_l1: "Приветствия",
    learn_l2: "Видео для аудирования",
    learn_l3: "Короткий тест",
    learn_l4: "Повседневные фразы",
    learn_l5: "Второй демо-урок",
    learn_l6: "Домашнее задание",
    learn_kind_homework: "Домашнее задание",
    learn_homework_text: "Напишите пять предложений в Present Perfect о вашей неделе и отправьте задание.",
    learn_homework_answer: "Ваш ответ",
    learn_homework_submit: "Отправить задание",
    learn_homework_done: "Домашнее задание для этого превью выполнено.",
    video_my_notes: "Мои заметки",
    video_add_note: "Добавить заметку",
    video_edit_note: "Изменить",
    video_delete_note: "Удалить",
    video_note_placeholder: "Напишите заметку к этому моменту…",
    video_notes_empty: "Заметок пока нет. Поставьте на паузу и добавьте заметку с таймкодом.",
    video_bookmarks: "Закладки",
    video_add_bookmark: "Добавить закладку",
    video_remove_bookmark: "Удалить закладку",
    video_bookmarks_empty: "Закладок пока нет.",
    video_resume_at: "Продолжить с",
    video_play: "Воспроизвести",
    video_seek: "Перемотка",
    video_volume: "Громкость",
    video_fullscreen: "Полный экран",
    video_duration_label: "Длительность",
    video_course_progress: "Прогресс курса",
    tp_title: "Подписка преподавателя",
    tp_compare: "Сравните планы преподавателя",
    tp_lead: "Выберите план, чтобы публиковать курсы. Только демо-оплата.",
    tp_current: "Текущий план преподавателя",
    tp_free: "Бесплатный преподаватель",
    tp_standard: "Standard преподаватель",
    tp_premium: "Premium преподаватель",
    tp_current_btn: "Текущий план",
    tp_switch: "Сменить план",
    tp_upgrade_standard: "Перейти на Standard",
    tp_upgrade_premium: "Перейти на Premium",
    tp_limit_reached: "Вы достигли лимита бесплатного преподавателя.",
    tp_courses_used: "Использованные курсы",
    tp_lessons_limit: "Уроков на курс",
    tp_students_used: "Студенты",
    tp_earnings: "Доход преподавателя",
    tp_earnings_note: "Демо-данные. Это не реальная финансовая информация.",
    tp_total_sales: "Всего продаж",
    tp_teacher_share: "Доход преподавателя",
    tp_platform_share: "Комиссия платформы",
    tp_courses_sold: "Проданные курсы",
    tp_this_month: "В этом месяце",
    tp_commission_rate: "Ставка комиссии",
    tp_feat_1_course: "1 курс",
    tp_feat_limited_lessons: "Ограниченные уроки",
    tp_feat_limited_students: "Ограниченные студенты",
    tp_feat_basic_analytics: "Базовая аналитика",
    tp_feat_publish: "Можно публиковать курс",
    tp_feat_10_courses: "До 10 курсов",
    tp_feat_more_lessons: "Больше уроков",
    tp_feat_more_students: "Больше студентов",
    tp_feat_analytics: "Аналитика курса",
    tp_feat_students: "Управление студентами",
    tp_feat_unlimited_courses: "Высокий/безлимитный лимит курсов",
    tp_feat_advanced_analytics: "Расширенная аналитика",
    tp_feat_advanced_ai: "Продвинутый AI",
    tp_feat_premium_resources: "Premium-материалы",
    tp_feat_priority: "Приоритетная поддержка",
    tp_note_upgraded: "Подписка преподавателя обновлена",
    tp_note_upgraded_text: "Ваш план преподавателя успешно обновлён.",
    reward_title: "Награды",
    reward_lead: "Зарабатывайте XP и MF Points во время обучения.",
    reward_xp: "Ваш XP",
    reward_level: "Текущий уровень",
    reward_next_level: "Прогресс до следующего уровня",
    reward_max_level: "Достигнут максимальный уровень",
    reward_mf_points: "MF Points",
    reward_points_note: "Баллы позже можно обменять на купоны. Только демо.",
    reward_great: "Отлично!",
    reward_homework: "Награды за домашнее задание",
    reward_homework_lead: "Выполните домашнее задание на странице обучения и получите +50 XP и +20 MF Points.",
    reward_homework_done: "Домашнее задание выполнено!",
    reward_lesson_done: "Урок завершён!",
    reward_quiz_done: "Тест завершён!",
    reward_course_done: "Курс завершён!",
    reward_unlocked: "ОТКРЫТО",
    reward_locked: "ЗАКРЫТО",
    reward_level_up: "Вы достигли нового уровня!",
    reward_level_1: "Beginner",
    reward_level_2: "Learner",
    reward_level_3: "Active Student",
    reward_level_4: "Language Explorer",
    reward_level_5: "Language Master",
    reward_ach_unlocked: "Достижение открыто",
    reward_ach_homework_hero: "Homework Hero",
    reward_ach_quiz_master: "Quiz Master",
    reward_ach_streak_7: "7 Day Streak",
    reward_ach_course_champion: "Course Champion",
    reward_ach_fast_learner: "Fast Learner",
    reward_xp_title: "Вы получили XP",
    reward_xp_lesson: "Урок завершён! +20 XP",
    reward_xp_homework: "Домашнее задание выполнено! +50 XP",
    reward_xp_quiz: "Тест завершён! +50 XP",
    reward_xp_course: "Курс завершён! +200 XP",
    reward_points_title: "MF Points",
    reward_points_homework: "Вы получили 20 MF Points.",
    reward_points_quiz: "Вы получили 30 MF Points.",
    reward_points_course: "Вы получили 100 MF Points.",
    course_complete_title: "Курс завершён на 100%",
    course_complete_text: "Поздравляем! Вы завершили {courseName} и получили сертификат.",

    card_limited: "Ограниченный контент",
    card_full: "Полный курс",
    card_premium_features: "Premium-возможности",
    dash_demo_progress: "Прогресс демо",
    dash_continue_demo: "Продолжить демо",
    course_price_required: "Для Standard и Premium укажите цену числом.",
    learn_kind_text: "Текст",
    learn_kind_video: "Видео",
    learn_kind_file: "Файл",
    learn_kind_quiz: "Тест",
    learn_q1: "She ___ a student.",
    learn_q2: "She ___ to the market yesterday.",
    learn_q3: "This is ___ apple.",
    learn_q4: "The book is ___ the table.",
    grade_title: "Журнал оценок",
    grade_lead: "Баллы теста и прогресс курса в этом превью.",
    grade_quiz: "Тест",
    grade_open: "Открыть журнал",
    grade_empty: "Балла пока нет. Откройте урок с тестом и отправьте его.",
    grade_take: "Открыть тест",
    plan_nav: "Планы",
    plan_free: "Бесплатный план",
    plan_premium: "Premium",
    plan_free_lead: "Сейчас у вас бесплатный план.",
    plan_premium_lead: "Все возможности Premium открыты.",
    plan_upgrade: "Перейти на Premium",
    plan_manage: "Управлять планом",
    plan_unlock: "Открыть с Premium",
    plan_monthly: "Ежемесячно",
    plan_membership: "Подписка",
    plan_month: "месяц",
    plan_per_month: "в месяц",
    plan_summary: "Подписка",
    plan_success: "Premium активен",
    plan_success_lead: "Поздравляем! Подписка Premium теперь активна.",
    plan_status: "Статус",
    plan_active: "Активен",
    plan_price: "Цена",
    plan_next: "Следующая дата оплаты",
    plan_feature: "Возможность",
    plan_continue: "Продолжить обучение",
    plan_current_lesson: "Текущий урок",
    plan_streak: "Серия обучения",
    plan_streak_lock: "Доступно с Premium.",
    plan_days: "дней",
    plan_longest: "Самая длинная серия",
    plan_progress: "Прогресс обучения",
    plan_completion: "Общее завершение",
    plan_quiz_avg: "Средний балл теста",
    plan_lessons_done: "Пройденные уроки",
    plan_hours: "Часы обучения",
    plan_analytics: "Подробная аналитика",
    plan_analytics_lock: "Откройте подробную аналитику с Premium.",
    plan_active_courses: "Активные курсы",
    plan_achievements: "Достижения",
    plan_calendar: "Календарь обучения",
    plan_calendar_lock: "Календарь доступен с Premium.",
    plan_resources: "Premium-материалы",
    plan_support: "Приоритетная поддержка",
    plan_free_price: "Бесплатно",
    coupon_have: "Есть купон?",
    coupon_placeholder: "Введите код купона",
    coupon_apply: "Применить",
    coupon_remove: "Удалить купон",
    coupon_invalid: "Код купона неверный или истёк.",
    coupon_ok: "Купон успешно применён",
    coupon_original: "Исходная цена",
    coupon_discount: "Скидка",
    coupon_final: "Итоговая цена",
    coupon_code: "Купон",
    coupon_total: "Итого",
    coupon_off: "СКИДКА",
    plan_enroll_free: "Записаться бесплатно",
    offer_title: "Что вы получите",
    offer_free: "Демо-курс",
    course_type_demo: "Демо",
    course_type_standard: "Стандарт",
    course_type_premium: "Premium",
    course_start_demo: "Начать демо",
    course_upgrade_standard: "Перейти на Стандарт",
    course_upgrade_premium: "Перейти на Premium",
    course_locked: "Закрытый урок",
    course_locked_text: "Купите полный курс, чтобы открыть этот урок.",
    course_bought: "Курс куплен",
    course_bought_text: "Курс успешно куплен.",
    course_enrolled: "Запись завершена",
    course_enrolled_text: "Вы записаны на курс {courseName}.",
    offer_demo_lessons: "2 демо-урока",
    offer_demo_video: "1 демо-видео",
    offer_demo_quiz: "1 демо-тест",
    offer_preview: "Предпросмотр курса",
    offer_locked: "Полные уроки закрыты",
    offer_written: "Текстовые уроки",
    offer_resume: "Продолжение с места остановки",
    offer_reviews: "Отзывы и оценки",
    course_type: "Тип курса",
    course_status: "Статус",
    course_draft: "Черновик",
    course_published: "Опубликован",
    course_preview: "Предпросмотр",
    course_preview_on: "Включён",
    course_preview_off: "Выключен",
    plan_type_demo: "Демо",
    plan_type_standard: "Стандарт",
    offer_premium: "Premium-курс",
    offer_access: "Доступ к демо",
    offer_basic_video: "Базовые видеоуроки",
    offer_basic_quiz: "Базовые тесты",
    offer_basic_progress: "Базовый прогресс",
    offer_complete: "Завершение курса",
    offer_standard_cert: "Стандартный сертификат",
    offer_community: "Поддержка сообщества",
    offer_full: "Полный доступ к курсу",
    offer_videos: "Полные видеоуроки",
    offer_files: "Материалы для скачивания",
    offer_analytics: "Подробная аналитика",
    offer_streak: "Серия обучения",
    offer_badges: "Достижения",
    offer_calendar: "Календарь обучения",
    offer_certificate: "Premium-сертификат",
    offer_ai: "Расширенная поддержка AI",
    offer_exclusive: "Эксклюзивный контент",
    offer_support: "Приоритетная поддержка",
    offer_coupon: "Купон на скидку",
    plan_type: "Тип",
    plan_type_all: "Все курсы",
    plan_type_free: "Демо",
    plan_type_premium: "Premium-курсы",
    plan_badge_free: "Демо",
    plan_badge_premium: "Premium",
    plan_badge_first: "Первый курс",
    plan_badge_quiz: "Первый тест",
    plan_badge_done: "Курс завершён",
    plan_badge_master: "Мастер тестов",
    plan_badge_streak: "Серия 7 дней",
    plan_course_lock: "Premium-курс",
    plan_course_lock_text: "Этот курс открывается с подпиской Premium.",
    plan_ai: "Premium AI-помощник",
    plan_row_free_courses: "Демо-курсы",
    plan_row_premium_courses: "Premium-курсы",
    plan_row_basic: "Базовый прогресс",
    plan_event_lesson: "Следующий урок · завтра 18:00",
    plan_event_quiz: "Короткий тест · пятница",
    plan_event_study: "Занятие · 25 минут",
    plan_event_live: "Живой урок · суббота",
    plan_note_active: "Premium активен",
    plan_note_active_text: "Поздравляем! Подписка Premium теперь активна.",
    plan_note_unlocked: "Возможность Premium открыта",
    plan_note_unlocked_text: "Аналитика, серия и календарь теперь открыты.",
    ai_premium: "Совет Premium: сегодня 20 минут учёбы, повтор вчерашнего теста, затем урок 21 английского A1.",
    studio_open: "Студия курса",
    studio_title: "Студия курса",
    studio_lead: "Соберите план курса в браузере. На сервер ничего не записывается.",
    studio_details: "О курсе",
    studio_course_title: "Название курса",
    studio_description: "Описание",
    studio_thumb: "Изображение",
    studio_subject: "Предмет",
    studio_module: "Модуль",
    studio_module_title: "Название модуля",
    studio_add_module: "Добавить модуль",
    studio_add_lesson: "Добавить урок",
    studio_lesson: "Урок",
    studio_remove: "Удалить",
    studio_quiz: "Тест",
    studio_preview: "Предпросмотр",
    studio_question: "Вопрос",
    studio_answers: "Ответы через |",
    studio_correct: "Номер правильного ответа",
    studio_add_question: "Добавить вопрос",
    studio_saved: "План обновлён только в этом превью.",
    apply_country: "Страна",
    apply_education: "Образование",
    apply_institution: "Университет / организация",
    apply_experience: "Преподавательский опыт",
    apply_years: "Лет опыта",
    apply_languages: "Языки",
    apply_bio: "Краткая биография",
    apply_portfolio: "LinkedIn / портфолио",
    apply_photo: "Фото профиля",
    apply_cv: "CV / резюме PDF",
    apply_upload_photo: "Выберите фото",
    apply_upload_photo_hint: "Необязательно",
    apply_upload_cv: "Загрузить PDF",
    apply_upload_cv_hint: "Только PDF",
    apply_change: "Изменить",
    apply_remove: "Удалить",
    apply_cv_required: "Загрузите CV в формате PDF.",
    apply_cv_pdf: "CV должен быть файлом PDF.",
    apply_submitted: "Заявка отправлена",
    apply_submitted_text: "Заявка преподавателя принята. Команда проверит данные и CV.",
    apply_status: "Статус",
    apply_pending: "На проверке",
    apply_approved: "Одобрено",
    apply_rejected: "Отклонено",
    apply_admin: "Заявки преподавателей",
    apply_details: "Детали заявки",
    apply_view: "Открыть",
    apply_preview: "Смотреть CV",
    apply_download: "Скачать CV",
    apply_empty: "Заявок преподавателей пока нет.",
    apply_cv_session: "Предпросмотр CV открывается в той же сессии браузера.",
    apply_reason: "Причина отказа",
    apply_approve: "Одобрить",
    apply_reject: "Отклонить",
    apply_note_submitted: "Заявка отправлена",
    apply_note_submitted_text: "Заявка преподавателя ожидает проверки.",
    apply_note_approved: "Заявка одобрена",
    apply_note_approved_text: "Ваша заявка преподавателя одобрена.",
    apply_note_rejected: "Заявка отклонена",
    apply_note_rejected_text: "Ваша заявка преподавателя отклонена.",
    apply_status_pending: "Заявка преподавателя сейчас на проверке.",
    apply_status_approved: "Заявка преподавателя одобрена. Инструменты преподавателя остаются превью.",
    apply_status_rejected: "Заявка преподавателя отклонена.",
    search_all: "все курсы",
    duration_8: "8 недель",
    duration_10: "10 недель",
    lessons_32: "32 урока",
    lessons_20: "20 живых уроков",
    lessons_16: "16 живых уроков",
    course_a1_title: "Английский A1 — полный курс для начинающих",
    course_a1_summary: "Начните английский с нуля: речь с поддержкой, бытовая лексика и понятная грамматика, которую можно использовать в тот же день.",
    course_a1_overview: "Этот начальный путь ведёт от первых приветствий к коротким бытовым разговорам. В каждом модуле видео, чтение и короткий тест. Занятия практичные: произношение и повседневные ситуации в центре.",
    learn_intro_en: "Представьтесь на английском",
    learn_listen: "Понимайте простые разговоры",
    learn_vocab: "Соберите бытовую лексику",
    learn_grammar: "Используйте базовую грамматику",
    learn_pronounce: "Улучшите произношение",
    learn_daily: "Говорите в обычных ситуациях",
    course_mid_summary: "Перейдите от осторожных фраз к свободному обсуждению. Практика мнения, рассказа и рабочего английского.",
    course_mid_overview: "На этом уровне основы уже есть. Курс развивает точность и беглость через дискуссии, короткие тексты и живое аудирование.",
    course_de_summary: "Начните немецкий с практических диалогов, ясной грамматики и надёжного произношения.",
    course_es_summary: "Испанский, на котором можно говорить с первого занятия, с культурными заметками в каждой теме.",
    course_fr_summary: "Мягкий старт во французском: постановка произношения и разговоры для поездок и учёбы.",
    course_biz_summary: "Звучите ясно и уверенно на встречах, в презентациях и в деловой переписке.",
    course_ielts_summary: "Подготовка к Academic IELTS: задания на время, обратная связь по баллам и стратегия для каждой части.",
    role_maya: "Академический координатор",
    label_remember: "Запомнить меня",
    btn_create: "Создать аккаунт",
    btn_go_login: "Ко входу",
    empty_courses: "Нет курсов по этому запросу.",
    empty_results: "Нет результатов",
    pager_prev: "Назад",
    pager_next: "Далее",
    label_sort: "Сортировка",
    label_level: "Уровень",
    label_language: "Язык",
    label_price: "Цена",
    price_free: "Бесплатно",
    btn_preview: "Превью",
    btn_play_preview: "Смотреть превью",
    btn_submit_review: "Отправить отзыв",
    label_your_name: "Ваше имя",
    label_your_review: "Ваш отзыв",
    label_rating: "Оценка",
    err_message_short: "Напишите не меньше 10 символов.",
    err_name_required: "Укажите имя.",
    err_email_required: "Укажите эл. почту.",
    err_email_invalid: "Введите корректный адрес эл. почты.",
    err_phone_required: "Укажите телефон.",
    err_phone_invalid: "Введите корректный номер телефона.",
    err_password_required: "Укажите пароль.",
    err_password_short: "Используйте не меньше 8 символов.",
    err_first_required: "Укажите имя.",
    err_last_required: "Укажите фамилию.",
    err_subject_required: "Укажите тему.",
    err_message_required: "Напишите сообщение.",
    err_bio_required: "Заполните поле «О себе».",
    err_confirm_required: "Подтвердите пароль.",
    err_confirm_mismatch: "Пароли не совпадают.",
    profile_password_hint: "В этом просмотре оставьте пустым",
    profile_bio_value: "Я изучаю начальный английский три вечера в неделю.",
    search_catalog: "Поиск по каталогу",
    search_instructors: "Поиск преподавателей",
    search_students: "Поиск студентов",
    search_articles: "Поиск статей",
    password_hint: "Не меньше 8 символов",
    contact_subject_hint: "Курс или вопрос",
    contact_message_hint: "Расскажите о цели и удобном расписании",
    review_hint: "Чему вы научились?",
    label_confirm: "Подтвердите пароль",
    auth_new: "Новый студент",
    auth_back: "На сайт",
    auth_login_hint: "Это превью только проверяет форму. Вход не выполняется.",
    auth_login_ready: "Данные проверены",
    auth_login_ready_text: "Это превью не открывает панель. Вход и доступ позже определит сервер.",
    auth_register_note: "Заполните данные. Форма проверяет их локально и не создаёт аккаунт.",
    auth_register_aside: "Создайте профиль студента и выберите курс под уровень и расписание.",
    auth_email_checked: "Почта проверена",
    auth_reset_note: "Введите эл. почту. Этот просмотр проверяет только формат.",
    language_menu: "Выбор языка",
    toggle_theme: "Переключить светлую и тёмную тему",
    theme_light: "Светлая тема включена",
    theme_dark: "Тёмная тема включена"
  }
};

Object.keys(phraseKeys).forEach(function (phrase) {
  translations.en[phraseKeys[phrase]] = phrase;
});
translations.en.auth_login_hint = "This preview only checks the form. It does not sign you in.";
translations.en.auth_login_ready = "Details checked";
translations.en.auth_login_ready_text = "This preview does not open a dashboard. Sign-in and access will be decided by the server later.";
translations.en.language_menu = "Language";
translations.en.toggle_theme = "Switch light and dark mode";
translations.en.theme_light = "Light mode is on";
translations.en.theme_dark = "Dark mode is on";
translations.en.faq_label = "FAQ";
translations.en.ai_title = "MF AI Assistant";
translations.en.ai_subtitle = "How can I help you?";
translations.en.ai_welcome = "Hello! Welcome to MF Language Academy.";
translations.en.ai_placeholder = "Write your message...";
translations.en.ai_hello = "Hello! How can I help you at MF Language Academy?";
translations.en.ai_demo = "I'm in demo mode. The real AI feature will be available after the backend is connected.";
translations.en.ai_send = "Send";
translations.en.ai_typing = "AI is typing...";
translations.en.ai_open = "Open AI Assistant";
translations.en.ai_hello = "Hello! How can I help you at MF Language Academy?";
translations.en.ai_help = "I can help you practice grammar, vocabulary, speaking and writing.";
translations.en.ai_present = "Present perfect is used to connect past actions with the present. For example: I have finished my homework.";
translations.en.ai_demo = "I'm in demo mode. The real AI feature will be available after the backend is connected.";
translations.en.pay_title = "Checkout";
translations.en.pay_summary = "Course summary";
translations.en.pay_instructor = "Instructor";
translations.en.pay_customer = "Customer information";
translations.en.pay_method = "Payment method";
translations.en.pay_card = "Bank card";
translations.en.pay_card_name = "Cardholder name";
translations.en.pay_card_number = "Card number";
translations.en.pay_expiry = "Expiry date";
translations.en.pay_cvv = "CVV";
translations.en.pay_secure = "This is a demo payment. Card details are not stored and no real charge is made.";
translations.en.pay_submit = "Complete payment";
translations.en.pay_processing = "Checking...";
translations.en.pay_success_title = "Payment completed successfully!";
translations.en.pay_success_lead = "Course enrollment completed successfully.";
translations.en.pay_amount = "Amount";
translations.en.pay_order = "Order number";
translations.en.pay_date = "Date";
translations.en.pay_start = "Start learning";
translations.en.pay_courses = "Go to my courses";
translations.en.pay_fail_title = "Payment failed";
translations.en.pay_fail_lead = "In this demo the card was declined. Nothing was charged.";
translations.en.pay_retry = "Try again";
translations.en.pay_err_required = "This field is required.";
translations.en.pay_err_email = "Enter a valid email.";
translations.en.pay_err_card = "Card number must be 16 digits.";
translations.en.pay_err_expiry = "Enter the date as MM/YY.";
translations.en.pay_err_cvv = "CVV must be 3 or 4 digits.";
translations.en.pay_demo_hint = "Demo: a card ending in 0000 shows a failed payment.";
translations.en.reg_student = "Student";
translations.en.reg_instructor = "Instructor";
translations.en.learn_continue = "Continue learning";
translations.en.learn_outline = "Lessons";
translations.en.learn_complete = "Mark complete";
translations.en.learn_text = "Read the lesson, then mark it complete. Progress stays in this browser preview only.";
translations.en.learn_video_note = "Video preview. A real player will use a lesson URL from the server.";
translations.en.learn_cert_locked = "The certificate appears when every lesson is complete.";
translations.en.learn_m1 = "Module 1 · Start";
translations.en.learn_m2 = "Module 2 · Practice";
translations.en.learn_l1 = "Greetings";
translations.en.learn_l2 = "Listening video";
translations.en.learn_l3 = "Short quiz";
translations.en.learn_l4 = "Everyday phrases";
translations.en.learn_l5 = "Second demo lesson";
translations.en.learn_l6 = "Homework";
translations.en.learn_kind_homework = "Homework";
translations.en.learn_homework_text = "Write five Present Perfect sentences about your week, then submit the homework.";
translations.en.learn_homework_answer = "Your answer";
translations.en.learn_homework_submit = "Submit homework";
translations.en.learn_homework_done = "Homework completed for this preview.";
translations.en.video_my_notes = "My Notes";
translations.en.video_add_note = "Add Note";
translations.en.video_edit_note = "Edit";
translations.en.video_delete_note = "Delete";
translations.en.video_note_placeholder = "Write a note for this moment…";
translations.en.video_notes_empty = "No notes yet. Pause and add a timestamp note.";
translations.en.video_bookmarks = "Bookmarks";
translations.en.video_add_bookmark = "Add Bookmark";
translations.en.video_remove_bookmark = "Remove bookmark";
translations.en.video_bookmarks_empty = "No bookmarks yet.";
translations.en.video_resume_at = "Continue from";
translations.en.video_play = "Play";
translations.en.video_seek = "Seek";
translations.en.video_volume = "Volume";
translations.en.video_fullscreen = "Fullscreen";
translations.en.video_duration_label = "Duration";
translations.en.video_course_progress = "Course progress";
translations.en.tp_title = "Teacher Subscription";
translations.en.tp_compare = "Compare Teacher Plans";
translations.en.tp_lead = "Choose a plan to publish courses on MF Language Academy. Demo billing only.";
translations.en.tp_current = "Current Teacher Plan";
translations.en.tp_free = "Free Teacher";
translations.en.tp_standard = "Standard Teacher";
translations.en.tp_premium = "Premium Teacher";
translations.en.tp_current_btn = "Current Plan";
translations.en.tp_switch = "Switch plan";
translations.en.tp_upgrade_standard = "Upgrade to Standard";
translations.en.tp_upgrade_premium = "Upgrade to Premium";
translations.en.tp_limit_reached = "You've reached your Free Teacher limit.";
translations.en.tp_courses_used = "Courses used";
translations.en.tp_lessons_limit = "Lessons per course";
translations.en.tp_students_used = "Students";
translations.en.tp_earnings = "Teacher Earnings";
translations.en.tp_earnings_note = "Mock preview data. Not real financial information.";
translations.en.tp_total_sales = "Total Sales";
translations.en.tp_teacher_share = "Teacher Earnings";
translations.en.tp_platform_share = "Platform Commission";
translations.en.tp_courses_sold = "Courses Sold";
translations.en.tp_this_month = "This Month";
translations.en.tp_commission_rate = "Commission rate";
translations.en.tp_feat_1_course = "1 Course";
translations.en.tp_feat_limited_lessons = "Limited Lessons";
translations.en.tp_feat_limited_students = "Limited Students";
translations.en.tp_feat_basic_analytics = "Basic Analytics";
translations.en.tp_feat_publish = "Can publish a course";
translations.en.tp_feat_10_courses = "Up to 10 Courses";
translations.en.tp_feat_more_lessons = "More Lessons";
translations.en.tp_feat_more_students = "More Students";
translations.en.tp_feat_analytics = "Course Analytics";
translations.en.tp_feat_students = "Student Management";
translations.en.tp_feat_unlimited_courses = "Higher/Unlimited Course Limit";
translations.en.tp_feat_advanced_analytics = "Advanced Analytics";
translations.en.tp_feat_advanced_ai = "Advanced AI";
translations.en.tp_feat_premium_resources = "Premium Resources";
translations.en.tp_feat_priority = "Priority Support";
translations.en.tp_note_upgraded = "Teacher subscription upgraded";
translations.en.tp_note_upgraded_text = "Your teacher plan was upgraded successfully.";
translations.en.reward_title = "Rewards";
translations.en.reward_lead = "Earn XP and MF Points as you learn.";
translations.en.reward_xp = "Your XP";
translations.en.reward_level = "Current Level";
translations.en.reward_next_level = "Progress to next level";
translations.en.reward_max_level = "Max level reached";
translations.en.reward_mf_points = "MF Points";
translations.en.reward_points_note = "Points can later become discount coupons. Demo only.";
translations.en.reward_great = "Great Job!";
translations.en.reward_homework = "Homework Rewards";
translations.en.reward_homework_lead = "Complete homework on the learning page to earn +50 XP and +20 MF Points.";
translations.en.reward_homework_done = "Homework completed!";
translations.en.reward_lesson_done = "Lesson completed!";
translations.en.reward_quiz_done = "Quiz completed!";
translations.en.reward_course_done = "Course completed!";
translations.en.reward_unlocked = "UNLOCKED";
translations.en.reward_locked = "LOCKED";
translations.en.reward_level_up = "You reached a new level!";
translations.en.reward_level_1 = "Beginner";
translations.en.reward_level_2 = "Learner";
translations.en.reward_level_3 = "Active Student";
translations.en.reward_level_4 = "Language Explorer";
translations.en.reward_level_5 = "Language Master";
translations.en.reward_ach_unlocked = "Achievement unlocked";
translations.en.reward_ach_homework_hero = "Homework Hero";
translations.en.reward_ach_quiz_master = "Quiz Master";
translations.en.reward_ach_streak_7 = "7 Day Streak";
translations.en.reward_ach_course_champion = "Course Champion";
translations.en.reward_ach_fast_learner = "Fast Learner";
translations.en.reward_xp_title = "XP earned";
translations.en.reward_xp_lesson = "Lesson completed! +20 XP";
translations.en.reward_xp_homework = "Homework completed! +50 XP";
translations.en.reward_xp_quiz = "Quiz completed! +50 XP";
translations.en.reward_xp_course = "Course completed! +200 XP";
translations.en.reward_points_title = "MF Points";
translations.en.reward_points_homework = "You earned 20 MF Points.";
translations.en.reward_points_quiz = "You earned 30 MF Points.";
translations.en.reward_points_course = "You earned 100 MF Points.";
translations.en.course_complete_title = "Course 100% complete";
translations.en.course_complete_text = "Congratulations! You completed {courseName} and earned your certificate.";

translations.en.card_limited = "Limited content";
translations.en.card_full = "Full course";
translations.en.card_premium_features = "Premium features";
translations.en.dash_demo_progress = "Demo progress";
translations.en.dash_continue_demo = "Continue Demo";
translations.en.course_price_required = "Standard and Premium prices must be a number.";
translations.en.learn_kind_text = "Text";
translations.en.learn_kind_video = "Video";
translations.en.learn_kind_file = "File";
translations.en.learn_kind_quiz = "Quiz";
translations.en.learn_q1 = "She ___ a student.";
translations.en.learn_q2 = "She ___ to the market yesterday.";
translations.en.learn_q3 = "This is ___ apple.";
translations.en.learn_q4 = "The book is ___ the table.";
translations.en.grade_title = "Grade book";
translations.en.grade_lead = "Quiz scores and course progress for this preview.";
translations.en.grade_quiz = "Quiz";
translations.en.grade_open = "Open grade book";
translations.en.grade_empty = "No quiz score yet. Open the quiz lesson and submit it.";
translations.en.grade_take = "Open the quiz";
translations.en.plan_nav = "Plans";
translations.en.plan_free = "Free Plan";
translations.en.plan_premium = "Premium";
translations.en.plan_free_lead = "You're currently using the Free plan.";
translations.en.plan_premium_lead = "All premium features are unlocked.";
translations.en.plan_upgrade = "Upgrade to Premium";
translations.en.plan_manage = "Manage Plan";
translations.en.plan_unlock = "Unlock with Premium";
translations.en.plan_monthly = "Monthly";
translations.en.plan_membership = "Membership";
translations.en.plan_month = "month";
translations.en.plan_per_month = "per month";
translations.en.plan_summary = "Membership";
translations.en.plan_success = "Premium is active";
translations.en.plan_success_lead = "Congratulations! Your Premium membership is now active.";
translations.en.plan_status = "Status";
translations.en.plan_active = "Active";
translations.en.plan_price = "Price";
translations.en.plan_next = "Next billing date";
translations.en.plan_feature = "Feature";
translations.en.plan_continue = "Continue learning";
translations.en.plan_current_lesson = "Current lesson";
translations.en.plan_streak = "Learning Streak";
translations.en.plan_streak_lock = "Available with Premium.";
translations.en.plan_days = "Days";
translations.en.plan_longest = "Longest streak";
translations.en.plan_progress = "Learning Progress";
translations.en.plan_completion = "Overall completion";
translations.en.plan_quiz_avg = "Quiz average";
translations.en.plan_lessons_done = "Completed lessons";
translations.en.plan_hours = "Learning hours";
translations.en.plan_analytics = "Advanced Analytics";
translations.en.plan_analytics_lock = "Unlock detailed learning analytics with Premium.";
translations.en.plan_active_courses = "Active courses";
translations.en.plan_achievements = "Achievements";
translations.en.plan_calendar = "Learning Calendar";
translations.en.plan_calendar_lock = "The calendar is available with Premium.";
translations.en.plan_resources = "Premium resources";
translations.en.plan_support = "Premium support";
translations.en.plan_free_price = "Free";
translations.en.coupon_have = "Have a coupon?";
translations.en.coupon_placeholder = "Enter coupon code";
translations.en.coupon_apply = "Apply";
translations.en.coupon_remove = "Remove Coupon";
translations.en.coupon_invalid = "Invalid or expired coupon code.";
translations.en.coupon_ok = "Coupon applied successfully";
translations.en.coupon_original = "Original Price";
translations.en.coupon_discount = "Discount";
translations.en.coupon_final = "Final Price";
translations.en.coupon_code = "Coupon";
translations.en.coupon_total = "Total";
translations.en.coupon_off = "OFF";
translations.en.plan_enroll_free = "Enroll Free";
translations.en.offer_title = "What you'll get";
translations.en.offer_free = "Demo Course";
translations.en.course_type_demo = "Demo";
translations.en.course_type_standard = "Standard";
translations.en.course_type_premium = "Premium";
translations.en.course_start_demo = "Start Demo";
translations.en.course_upgrade_standard = "Upgrade to Standard";
translations.en.course_upgrade_premium = "Upgrade to Premium";
translations.en.course_locked = "Locked lesson";
translations.en.course_locked_text = "Purchase the full course to unlock this lesson.";
translations.en.course_bought = "Course purchased";
translations.en.course_bought_text = "Course purchased successfully.";
translations.en.course_enrolled = "Enrollment complete";
translations.en.course_enrolled_text = "You are now enrolled in {courseName}.";
translations.en.offer_demo_lessons = "2 demo lessons";
translations.en.offer_demo_video = "1 demo video";
translations.en.offer_demo_quiz = "1 demo quiz";
translations.en.offer_preview = "Course preview";
translations.en.offer_locked = "Full lessons stay locked";
translations.en.offer_written = "Written lesson content";
translations.en.offer_resume = "Resume learning";
translations.en.offer_reviews = "Reviews and ratings";
translations.en.course_type = "Course type";
translations.en.course_status = "Status";
translations.en.course_draft = "Draft";
translations.en.course_published = "Published";
translations.en.course_preview = "Preview";
translations.en.course_preview_on = "Enabled";
translations.en.course_preview_off = "Disabled";
translations.en.plan_type_demo = "Demo";
translations.en.plan_type_standard = "Standard";
translations.en.offer_premium = "Premium Course";
translations.en.offer_access = "Demo access";
translations.en.offer_basic_video = "Basic video lessons";
translations.en.offer_basic_quiz = "Basic quizzes";
translations.en.offer_basic_progress = "Basic progress tracking";
translations.en.offer_complete = "Course completion";
translations.en.offer_standard_cert = "Standard certificate";
translations.en.offer_community = "Community support";
translations.en.offer_full = "Full course access";
translations.en.offer_videos = "Complete video lessons";
translations.en.offer_files = "Downloadable resources";
translations.en.offer_analytics = "Advanced analytics";
translations.en.offer_streak = "Learning streak";
translations.en.offer_badges = "Achievements";
translations.en.offer_calendar = "Learning calendar";
translations.en.offer_certificate = "Premium certificate";
translations.en.offer_ai = "Advanced AI learning support";
translations.en.offer_exclusive = "Exclusive content";
translations.en.offer_support = "Priority support";
translations.en.offer_coupon = "Discount coupon support";
translations.en.plan_type = "Type";
translations.en.plan_type_all = "All courses";
translations.en.plan_type_free = "Demo";
translations.en.plan_type_premium = "Premium courses";
translations.en.plan_badge_free = "Demo";
translations.en.plan_badge_premium = "Premium";
translations.en.plan_badge_first = "First course";
translations.en.plan_badge_quiz = "First quiz";
translations.en.plan_badge_done = "Course completed";
translations.en.plan_badge_master = "Quiz master";
translations.en.plan_badge_streak = "7 day streak";
translations.en.plan_course_lock = "Premium Course";
translations.en.plan_course_lock_text = "This course is available with Premium membership.";
translations.en.plan_ai = "Premium AI Assistant";
translations.en.plan_row_free_courses = "Demo courses";
translations.en.plan_row_premium_courses = "Premium courses";
translations.en.plan_row_basic = "Basic progress";
translations.en.plan_event_lesson = "Upcoming lesson · tomorrow 18:00";
translations.en.plan_event_quiz = "Short quiz · Friday";
translations.en.plan_event_study = "Study session · 25 minutes";
translations.en.plan_event_live = "Live lesson · Saturday";
translations.en.plan_note_active = "Premium activated";
translations.en.plan_note_active_text = "Congratulations! Your Premium membership is now active.";
translations.en.plan_note_unlocked = "Premium feature unlocked";
translations.en.plan_note_unlocked_text = "Analytics, streak and calendar are now open.";
translations.en.ai_premium = "Premium suggestion: study 20 minutes today, review yesterday's quiz, then continue English A1 lesson 21.";
translations.en.studio_open = "Course studio";
translations.en.studio_title = "Course studio";
translations.en.studio_lead = "Build a course outline in the browser. Nothing is saved on a server.";
translations.en.studio_details = "Course details";
translations.en.studio_course_title = "Course title";
translations.en.studio_description = "Description";
translations.en.studio_thumb = "Thumbnail";
translations.en.studio_subject = "Subject";
translations.en.studio_module = "Module";
translations.en.studio_module_title = "Module title";
translations.en.studio_add_module = "Add module";
translations.en.studio_add_lesson = "Add lesson";
translations.en.studio_lesson = "Lesson";
translations.en.studio_remove = "Remove";
translations.en.studio_quiz = "Quiz";
translations.en.studio_preview = "Preview";
translations.en.studio_question = "Question";
translations.en.studio_answers = "Answers, separated by |";
translations.en.studio_correct = "Correct answer number";
translations.en.studio_add_question = "Add question";
translations.en.studio_saved = "Outline updated in this preview only.";
translations.en.apply_country = "Country";
translations.en.apply_education = "Education";
translations.en.apply_institution = "University / Institution";
translations.en.apply_experience = "Teaching experience";
translations.en.apply_years = "Years of experience";
translations.en.apply_languages = "Languages";
translations.en.apply_bio = "Short biography";
translations.en.apply_portfolio = "LinkedIn / portfolio URL";
translations.en.apply_photo = "Profile photo";
translations.en.apply_cv = "CV / Resume PDF";
translations.en.apply_upload_photo = "Choose a photo";
translations.en.apply_upload_photo_hint = "Optional";
translations.en.apply_upload_cv = "Upload CV";
translations.en.apply_upload_cv_hint = "PDF only";
translations.en.apply_change = "Change";
translations.en.apply_remove = "Remove";
translations.en.apply_cv_required = "Upload a PDF CV.";
translations.en.apply_cv_pdf = "The CV must be a PDF file.";
translations.en.apply_submitted = "Application submitted";
translations.en.apply_submitted_text = "Your teacher application has been submitted successfully. Our administration team will review your information and CV.";
translations.en.apply_status = "Status";
translations.en.apply_pending = "Pending review";
translations.en.apply_approved = "Approved";
translations.en.apply_rejected = "Rejected";
translations.en.apply_admin = "Teacher applications";
translations.en.apply_details = "Application details";
translations.en.apply_view = "View";
translations.en.apply_preview = "Preview CV";
translations.en.apply_download = "Download CV";
translations.en.apply_empty = "No teacher applications yet.";
translations.en.apply_cv_session = "Open the CV preview in the same browser session it was uploaded.";
translations.en.apply_reason = "Rejection reason";
translations.en.apply_approve = "Approve";
translations.en.apply_reject = "Reject";
translations.en.apply_note_submitted = "Application submitted";
translations.en.apply_note_submitted_text = "Your teacher application is waiting for review.";
translations.en.apply_note_approved = "Application approved";
translations.en.apply_note_approved_text = "Your teacher application has been approved.";
translations.en.apply_note_rejected = "Application rejected";
translations.en.apply_note_rejected_text = "Your teacher application has been rejected.";
translations.en.apply_status_pending = "Your teacher application is currently under review.";
translations.en.apply_status_approved = "Your teacher application has been approved. Instructor tools stay available as a preview.";
translations.en.apply_status_rejected = "Your teacher application was rejected.";
translations.en.faq_open = "Help and questions";
translations.en.support_label = "Support";
translations.en.faq_courses_certs = "Course and certificate FAQ";
translations.en.faq_browse = "Browse courses";
translations.en.faq_learning = "Learning";
translations.en.faq_quiz = "Quiz and grades";
translations.en.faq_contact_support = "Contact support";
translations.en.search_clear = "Clear Search";
translations.en.search_none_title = "No courses found";
translations.en.search_none_lead = "We couldn't find any courses matching";
translations.en.search_none_try = "Try another search term.";
translations.en.search_none_filters = "No courses match those filters.";
translations.en.search_showing_all = "Showing all courses";
translations.en.search_course_one = "Course";
translations.en.search_course_many = "Courses";
translations.en.search_courses_found = "Courses Found";
translations.en.search_showing = "Showing";
translations.en.search_of = "of";
translations.en.search_go = "Search";
translations.en.page_missing = "Page not found";
translations.en.page_missing_text = "That page does not exist.";
translations.en.mark_all_read = "Mark all as read";
translations.en.view_all_notifications = "View all notifications";
translations.en.no_notifications = "No new notifications";
translations.en.notifications_caught_up = "You're all caught up.";
translations.en.open_notifications = "Notifications";
translations.en.notify_filter_unread = "Unread";
translations.en.notification_new_course = "New course added";
translations.en.notification_new_course_message = "A new course is now available.";
translations.en.notification_new_lesson = "New lesson available";
translations.en.notification_new_lesson_message = "A new lesson has been added to your course.";
translations.en.notification_quiz_result = "Quiz result available";
translations.en.notification_quiz_result_message = "Your quiz result is ready.";
translations.en.notification_certificate = "Certificate available";
translations.en.notification_certificate_message = "Congratulations! Your certificate is ready.";
translations.en.cert_congrats_title = "Congratulations";
translations.en.cert_congrats_message = "Congratulations! You have completed {courseName} and earned your certificate.";
translations.en.cert_title = "Certificate of Completion";
translations.en.cert_my = "My Certificates";
translations.en.cert_view = "View Certificate";
translations.en.cert_download = "Download Certificate";
translations.en.cert_print = "Print Certificate";
translations.en.cert_id = "Certificate ID";
translations.en.cert_completed_on = "Completed on";
translations.en.cert_instructor = "Instructor";
translations.en.cert_none_title = "No certificates yet";
translations.en.cert_none_text = "Complete a course to earn your first certificate.";
translations.en.cert_awarded = "This certificate is awarded to";
translations.en.cert_for = "for successfully completing";
translations.en.cert_back = "Back to lessons";
translations.en.cert_missing = "Certificate not found";
translations.en.cert_sign_role = "Academic director";
translations.en.course_en_a2 = "English A2";
translations.en.cert_date_en_a2 = "30 September 2026";
translations.en.course_en_a2_progress = "Completed · 100%";
translations.en.quiz_notify_title = "Registration successful!";
translations.en.quiz_notify_text = "Take a free English level assessment and discover your approximate level.";
translations.en.quiz_notify_btn = "Take Assessment";
translations.en.quiz_close = "Close";
translations.en.quiz_title = "English level assessment";
translations.en.quiz_lead = "This is a short demo test. The result is not an official CEFR certificate.";
translations.en.quiz_progress = "Question {current} of {total}";
translations.en.quiz_previous = "Previous";
translations.en.quiz_next = "Next";
translations.en.quiz_submit = "Submit";
translations.en.quiz_choose = "Choose an answer to continue.";
translations.en.quiz_result_title = "Your assessment result";
translations.en.quiz_score_label = "Score";
translations.en.quiz_level_label = "Estimated level";
translations.en.quiz_demo_note = "This is an approximate demo placement result. It is not an official CEFR certificate.";
translations.en.quiz_recommend = "Recommended courses";
translations.en.quiz_no_courses = "No matching course is available for this level yet.";
translations.en.quiz_level_a1 = "A1 — Beginner";
translations.en.quiz_level_a2 = "A2 — Elementary";
translations.en.quiz_level_b1 = "B1 — Intermediate";
translations.en.quiz_level_b2 = "B2 — Upper intermediate";
translations.en.quiz_level_c1 = "C1 — Advanced";
translations.en.notification_enrollment = "Enrollment successful";
translations.en.notification_enrollment_message = "You have successfully enrolled in a course.";
translations.en.notification_new_student = "New student enrolled";
translations.en.notification_new_student_message = "A new student enrolled in your course.";
translations.en.notification_announcement = "New announcement";
translations.en.notification_announcement_message = "There is a new announcement from MF Language Academy.";
translations.en.time_just_now = "Just now";
translations.en.time_5_minutes = "5 minutes ago";
translations.en.time_20_minutes = "20 minutes ago";
translations.en.time_1_hour = "1 hour ago";
translations.en.time_yesterday = "Yesterday";
translations.en.faq_cat_courses = "Courses";
translations.en.faq_cat_lessons = "Lessons";
translations.en.faq_cat_quizzes = "Quizzes";
translations.en.faq_cat_certs = "Certificates";
translations.en.faq_cat_account = "Account";
translations.en.faq_cat_tech = "Technical support";
translations.en.faq_q_enroll = "How do I enroll in a course?";
translations.en.faq_a_enroll = "Choose a course from the catalog, open the course details page, and click Enroll.";
translations.en.faq_q_view = "How can I view my course?";
translations.en.faq_a_view = "Open the course page, or continue on the lesson page. The last lesson stays selected in the list.";
translations.en.faq_q_access = "How long do I have access?";
translations.en.faq_a_access = "This preview shows the access period on the course page. A student account will store it there later.";
translations.en.faq_q_continue = "How do I continue where I stopped?";
translations.en.faq_a_continue = "Open the lesson page. The last lesson stays selected in the list on the left. Click it to continue.";
translations.en.faq_q_complete = "How do I mark a lesson as completed?";
translations.en.faq_a_complete = "On the lesson page, click Mark complete. This is an on-screen preview only.";
translations.en.faq_q_quiz = "How do quizzes work?";
translations.en.faq_a_quiz = "On the lesson page, open the short quiz, choose an answer, and click Submit. The result appears on the same page.";
translations.en.faq_q_score = "Where can I see my score?";
translations.en.faq_a_score = "The score appears in the grade book at the top of the lesson page. The Quiz and grades link opens that section.";
translations.en.faq_q_cert_when = "When do I receive my certificate?";
translations.en.faq_a_cert_when = "A certificate of completion is ready when the course lessons and quizzes are finished.";
translations.en.faq_q_cert_where = "Where can I view my certificates?";
translations.en.faq_a_cert_where = "Open the Certificates link. The page shows the name, course, instructor, date, and certificate number.";
translations.en.faq_q_profile = "How do I update my profile?";
translations.en.faq_a_profile = "On the profile page, edit your name, contact details, and bio, then save.";
translations.en.faq_q_password = "How do I change my password?";
translations.en.faq_a_password = "Fill in the new password field on the profile page. This preview does not send the password to a server.";
translations.en.faq_q_lesson_fail = "What should I do if a lesson does not open?";
translations.en.faq_a_lesson_fail = "Refresh the page or try another browser. If it still fails, write through the contact form.";
translations.en.slider_dot_course = "Show course group";
translations.en.slider_dot_story = "Show testimonial group";
translations.az.slider_dot_course = "Kurs qrupunu göstər";
translations.az.slider_dot_story = "Rəy qrupunu göstər";
translations.ru.slider_dot_course = "Показать группу курсов";
translations.ru.slider_dot_story = "Показать группу отзывов";
translations.en.faq_q_contact = "How can I contact support?";
translations.en.faq_a_contact = "Use the form on the contact page, or email hello@mflanguage.academy.";

if (window.MF_EXTRA) {
  Object.keys(window.MF_EXTRA).forEach(function (key) {
    const row = window.MF_EXTRA[key];
    translations.en[key] = row.en;
    translations.az[key] = row.az;
    translations.ru[key] = row.ru;
    if (row.en && !phraseKeys[row.en]) phraseKeys[row.en] = key;
  });
}

let currentLanguage = "az";

function mfT(key, fallback) {
  const pack = translations[currentLanguage] || translations.az;
  if (pack && pack[key] != null && pack[key] !== "") return pack[key];
  if (translations.en && translations.en[key] != null) return translations.en[key];
  return fallback == null ? key : fallback;
}

function mfText(value) {
  if (value == null) return value;
  const key = phraseKeys[value];
  if (!key) return value;
  return mfT(key, value);
}

function setElementText(el, text) {
  const nodes = [];
  el.childNodes.forEach(function (node) {
    if (node.nodeType === 3 && node.textContent.trim()) nodes.push(node);
  });
  if (!nodes.length) {
    if (el.children.length) return;
    el.textContent = text;
    return;
  }
  const node = nodes[nodes.length - 1];
  const lead = /^\s/.test(node.textContent) ? " " : "";
  const trail = /\s$/.test(node.textContent) ? " " : "";
  node.textContent = lead + text + trail;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    if (el.hasAttribute("data-bind")) return;
    const value = mfT(el.getAttribute("data-i18n"), null);
    if (value == null) return;
    setElementText(el, value);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    const value = mfT(el.getAttribute("data-i18n-placeholder"), null);
    if (value != null) el.setAttribute("placeholder", value);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
    const value = mfT(el.getAttribute("data-i18n-aria-label"), null);
    if (value != null) el.setAttribute("aria-label", value);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
    const value = mfT(el.getAttribute("data-i18n-alt"), null);
    if (value != null) el.setAttribute("alt", value);
  });
  document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
    const value = mfT(el.getAttribute("data-i18n-title"), null);
    if (value != null) {
      el.dataset.title = value;
      if (el.hasAttribute("title")) el.setAttribute("title", value);
    }
  });
  document.querySelectorAll("[data-i18n-role]").forEach(function (el) {
    const value = mfT(el.getAttribute("data-i18n-role"), null);
    if (value != null) el.dataset.role = value;
  });
  document.querySelectorAll("[data-i18n-bio]").forEach(function (el) {
    const value = mfT(el.getAttribute("data-i18n-bio"), null);
    if (value != null) el.dataset.bio = value;
  });
  document.querySelectorAll("[data-i18n-body]").forEach(function (el) {
    const value = mfT(el.getAttribute("data-i18n-body"), null);
    if (value != null) el.dataset.body = value;
  });
  document.querySelectorAll("[data-i18n-label]").forEach(function (el) {
    const value = mfT(el.getAttribute("data-i18n-label"), null);
    if (value != null) el.setAttribute("data-label", value);
  });
}

function applyTheme(theme) {
  const dark = theme === "dark";
  if (dark) document.documentElement.setAttribute("data-theme", "dark");
  else document.documentElement.removeAttribute("data-theme");
  document.querySelectorAll(".theme-toggle").forEach(function (button) {
    button.setAttribute("aria-pressed", dark ? "true" : "false");
    const label = mfT(dark ? "theme_dark" : "theme_light");
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
    const icon = button.querySelector("i");
    if (icon) icon.className = dark ? "bi bi-sun" : "bi bi-moon-stars";
  });
}

function setLanguage(language) {
  if (language !== "az" && language !== "ru" && language !== "en") language = "az";
  currentLanguage = language;
  document.documentElement.lang = language;
  try { localStorage.setItem("mf-language", language); } catch (error) { /* storage may be blocked */ }

  applyTranslations();

  const code = language.toUpperCase();
  document.querySelectorAll(".lang-current").forEach(function (el) { el.textContent = code; });
  document.querySelectorAll("[data-set-lang]").forEach(function (button) {
    const selected = button.getAttribute("data-set-lang") === language;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", selected ? "true" : "false");
  });

  document.querySelectorAll(".nav-toggle").forEach(function (toggle) {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-label", mfT(open ? "close_menu" : "open_menu"));
  });

  document.querySelectorAll("[data-password-toggle]").forEach(function (button) {
    const input = button.parentElement && button.parentElement.querySelector("input");
    const showing = input && input.type === "text";
    button.setAttribute("aria-label", mfT(showing ? "hide_password" : "show_password"));
  });

  const activeView = document.querySelector("[data-view-target].is-active");
  const dashTitle = document.querySelector(".dash-title");
  if (activeView && dashTitle && activeView.dataset.title) dashTitle.textContent = activeView.dataset.title;

  const teacherModal = document.querySelector('[data-modal="teacher"]');
  if (teacherModal && teacherModal.classList.contains("is-open")) {
    const name = teacherModal.querySelector("[data-teacher='name']");
    const match = name && Array.prototype.find.call(document.querySelectorAll("[data-teacher-open]"), function (button) {
      return button.dataset.name === name.textContent;
    });
    if (match) {
      const role = teacherModal.querySelector("[data-teacher='role']");
      const bio = teacherModal.querySelector("[data-teacher='bio']");
      if (role) role.textContent = match.dataset.role || "";
      if (bio) bio.textContent = match.dataset.bio || "";
    }
  }

  const queryLabel = document.querySelector("[data-search-query]");
  if (queryLabel) {
    const query = new URLSearchParams(window.location.search).get("q");
    if (!query) queryLabel.textContent = mfT("search_all");
  }

  const activeMessage = document.querySelector("[data-message].is-active");
  const messageView = document.querySelector(".message-view");
  if (activeMessage && messageView) {
    const body = messageView.querySelector("p");
    if (body && activeMessage.dataset.body) body.textContent = activeMessage.dataset.body;
  }

  if (typeof window.renderCourseDetail === "function") window.renderCourseDetail();
  if (typeof window.refreshCheckoutLanguage === "function") window.refreshCheckoutLanguage();
  if (document.querySelector("[data-assessment]") && typeof window.renderQuestion === "function") window.renderQuestion();
  if (typeof window.renderCertificatePage === "function") window.renderCertificatePage();
  if (typeof window.renderCertificateList === "function") window.renderCertificateList();
  document.dispatchEvent(new CustomEvent("mf-language"));
  applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
}

function closeLangMenus(except) {
  document.querySelectorAll(".lang-switch").forEach(function (wrap) {
    if (wrap === except) return;
    const menu = wrap.querySelector(".lang-menu");
    const toggle = wrap.querySelector(".lang-toggle");
    if (menu) menu.hidden = true;
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });
}

function initLanguageSwitcher() {
  if (document.documentElement.dataset.langReady !== "1") {
    document.documentElement.dataset.langReady = "1";
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".lang-switch")) closeLangMenus(null);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeLangMenus(null);
    });
  }

  document.querySelectorAll(".lang-switch").forEach(function (wrap) {
    if (wrap.dataset.langBound === "1") return;
    wrap.dataset.langBound = "1";
    const toggle = wrap.querySelector(".lang-toggle");
    const menu = wrap.querySelector(".lang-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      const open = menu.hidden;
      closeLangMenus(open ? wrap : null);
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        const current = menu.querySelector(".is-active") || menu.querySelector("[data-set-lang]");
        if (current) current.focus();
      }
    });

    toggle.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowDown" && event.key !== "Enter" && event.key !== " ") return;
      if (event.key === "Enter" || event.key === " ") return;
      event.preventDefault();
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      const first = menu.querySelector("[data-set-lang]");
      if (first) first.focus();
    });

    menu.addEventListener("keydown", function (event) {
      const options = Array.prototype.slice.call(menu.querySelectorAll("[data-set-lang]"));
      const index = options.indexOf(document.activeElement);
      if (event.key === "Escape") {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        options[(index + 1) % options.length].focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        options[(index - 1 + options.length) % options.length].focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        options[0].focus();
      } else if (event.key === "End") {
        event.preventDefault();
        options[options.length - 1].focus();
      }
    });

    menu.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        setLanguage(button.getAttribute("data-set-lang"));
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      });
    });
  });
}

function initThemeSwitcher() {
  document.querySelectorAll(".theme-toggle").forEach(function (button) {
    if (button.dataset.themeBound === "1") return;
    button.dataset.themeBound = "1";
    button.addEventListener("click", function () {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem("mf-theme", next); } catch (error) { /* storage may be blocked */ }
      applyTheme(next);
    });
  });
}

function loadSavedPreferences() {
  let theme = "light";
  let language = "az";
  try {
    const savedTheme = localStorage.getItem("mf-theme");
    if (savedTheme === "dark" || savedTheme === "light") theme = savedTheme;
    const savedLanguage = localStorage.getItem("mf-language");
    if (savedLanguage === "az" || savedLanguage === "ru" || savedLanguage === "en") language = savedLanguage;
  } catch (error) { /* keep defaults */ }
  applyTheme(theme);
  setLanguage(language);
}

function t(key) {
  return mfT(key);
}

window.mfT = mfT;
window.t = t;
window.applyTranslations = applyTranslations;
window.mfText = mfText;
window.MF_PHRASE_KEYS = phraseKeys;
window.setLanguage = setLanguage;
window.applyTheme = applyTheme;
window.initThemeSwitcher = initThemeSwitcher;
window.initLanguageSwitcher = initLanguageSwitcher;
window.loadSavedPreferences = loadSavedPreferences;

document.addEventListener("DOMContentLoaded", function () {
  loadSavedPreferences();
  initThemeSwitcher();
  initLanguageSwitcher();
});
