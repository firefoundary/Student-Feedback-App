(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_ad773c35._.js", {

"[project]/src/utils/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "api": (()=>api)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@trpc/react-query/dist/index.mjs [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$createTRPCReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/react-query/dist/createTRPCReact.mjs [app-client] (ecmascript)");
;
const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$react$2d$query$2f$dist$2f$createTRPCReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTRPCReact"])();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/EditStudent/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>EditStudentPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../app/NavigationBar/'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function EditStudentPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Get the student ID from URL params
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    // Fetch student data
    const { data: studentData, isLoading: isLoadingStudent } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].student.getById.useQuery({
        id: id
    }, {
        enabled: !!id
    });
    // Mutation for updating student
    const updateStudent = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].student.update.useMutation({
        onSuccess: {
            "EditStudentPage.useMutation[updateStudent]": ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Student information updated successfully!");
                router.push('/students'); // Redirect after successful update
            }
        }["EditStudentPage.useMutation[updateStudent]"],
        onError: {
            "EditStudentPage.useMutation[updateStudent]": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to update student information");
                console.error("Update error:", error);
            }
        }["EditStudentPage.useMutation[updateStudent]"]
    });
    // Mutations for additional actions
    const addSubject = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].student.addSubject.useMutation({
        onError: {
            "EditStudentPage.useMutation[addSubject]": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to add subject");
                console.error("Add subject error:", error);
            }
        }["EditStudentPage.useMutation[addSubject]"]
    });
    const addGrade = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].student.addGrade.useMutation({
        onError: {
            "EditStudentPage.useMutation[addGrade]": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to add grade");
                console.error("Add grade error:", error);
            }
        }["EditStudentPage.useMutation[addGrade]"]
    });
    const updateAttendance = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].student.updateAttendance.useMutation({
        onError: {
            "EditStudentPage.useMutation[updateAttendance]": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to update attendance");
                console.error("Update attendance error:", error);
            }
        }["EditStudentPage.useMutation[updateAttendance]"]
    });
    const addBehavioralNote = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].student.addBehavioralNote.useMutation({
        onError: {
            "EditStudentPage.useMutation[addBehavioralNote]": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to add behavioral note");
                console.error("Add behavioral note error:", error);
            }
        }["EditStudentPage.useMutation[addBehavioralNote]"]
    });
    // State for form data
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        studentId: "",
        grade: ""
    });
    // Subjects state
    const [subjects, setSubjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Attendance state
    const [attendance, setAttendance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        present: 0,
        absent: 0,
        late: 0
    });
    // Behavioral notes state
    const [behavioralNote, setBehavioralNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Populate form when student data is loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditStudentPage.useEffect": ()=>{
            if (studentData) {
                setFormData({
                    name: studentData.name,
                    studentId: studentData.studentId,
                    grade: studentData.grade
                });
                setSubjects(studentData.subjects?.map({
                    "EditStudentPage.useEffect": (subject)=>({
                            id: subject.id,
                            name: subject.name,
                            performance: subject.performance || undefined,
                            grades: subject.grades.map({
                                "EditStudentPage.useEffect": (grade)=>({
                                        value: grade.value
                                    })
                            }["EditStudentPage.useEffect"])
                        })
                }["EditStudentPage.useEffect"]) || []);
                setAttendance(studentData.attendance || {
                    present: 0,
                    absent: 0,
                    late: 0
                });
                // Get the latest behavioral note
                if (studentData.behavioralNotes && studentData.behavioralNotes.length > 0) {
                    setBehavioralNote(studentData.behavioralNotes[studentData.behavioralNotes.length - 1].content);
                }
            }
        }
    }["EditStudentPage.useEffect"], [
        studentData
    ]);
    // Handle main form input changes
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    // Submit form
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("No student ID provided");
            return;
        }
        try {
            // Update student basic info
            await updateStudent.mutateAsync({
                id: id,
                ...formData
            });
            // Update attendance
            await updateAttendance.mutateAsync({
                studentId: id,
                ...attendance
            });
            // Add/update subjects
            for (const subject of subjects){
                // Add or update subject
                const savedSubject = subject.id ? subject : await addSubject.mutateAsync({
                    studentId: id,
                    name: subject.name,
                    performance: subject.performance
                });
                // Add grades for the subject
                for (const grade of subject.grades){
                    await addGrade.mutateAsync({
                        subjectId: savedSubject.id,
                        value: grade.value
                    });
                }
            }
            // Add behavioral note if not empty
            if (behavioralNote.trim()) {
                await addBehavioralNote.mutateAsync({
                    studentId: id,
                    content: behavioralNote
                });
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Student information updated successfully!");
            router.push('/students');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to update student information");
            console.error(error);
        }
    };
    if (isLoadingStudent) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/EditStudent/page.tsx",
            lineNumber: 182,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavigationBar, {}, void 0, false, {
                fileName: "[project]/src/app/EditStudent/page.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-6 text-center",
                children: "Edit Student Information"
            }, void 0, false, {
                fileName: "[project]/src/app/EditStudent/page.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-6"
            }, void 0, false, {
                fileName: "[project]/src/app/EditStudent/page.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/EditStudent/page.tsx",
        lineNumber: 186,
        columnNumber: 5
    }, this);
}
_s(EditStudentPage, "5cCr+Hg3xc4r5nofWnxhYZ2kHgQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = EditStudentPage;
var _c;
__turbopack_context__.k.register(_c, "EditStudentPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/goober/dist/goober.modern.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "css": (()=>u),
    "extractCss": (()=>r),
    "glob": (()=>b),
    "keyframes": (()=>h),
    "setup": (()=>m),
    "styled": (()=>j)
});
let e = {
    data: ""
}, t = (t)=>"object" == typeof window ? ((t ? t.querySelector("#_goober") : window._goober) || Object.assign((t || document.head).appendChild(document.createElement("style")), {
        innerHTML: " ",
        id: "_goober"
    })).firstChild : t || e, r = (e)=>{
    let r = t(e), l = r.data;
    return r.data = "", l;
}, l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, a = /\/\*[^]*?\*\/|  +/g, n = /\n+/g, o = (e, t)=>{
    let r = "", l = "", a = "";
    for(let n in e){
        let c = e[n];
        "@" == n[0] ? "i" == n[1] ? r = n + " " + c + ";" : l += "f" == n[1] ? o(c, n) : n + "{" + o(c, "k" == n[1] ? "" : t) + "}" : "object" == typeof c ? l += o(c, t ? t.replace(/([^,])+/g, (e)=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t)=>/&/.test(t) ? t.replace(/&/g, e) : e ? e + " " + t : t)) : n) : null != c && (n = /^--/.test(n) ? n : n.replace(/[A-Z]/g, "-$&").toLowerCase(), a += o.p ? o.p(n, c) : n + ":" + c + ";");
    }
    return r + (t && a ? t + "{" + a + "}" : a) + l;
}, c = {}, s = (e)=>{
    if ("object" == typeof e) {
        let t = "";
        for(let r in e)t += r + s(e[r]);
        return t;
    }
    return e;
}, i = (e, t, r, i, p)=>{
    let u = s(e), d = c[u] || (c[u] = ((e)=>{
        let t = 0, r = 11;
        for(; t < e.length;)r = 101 * r + e.charCodeAt(t++) >>> 0;
        return "go" + r;
    })(u));
    if (!c[d]) {
        let t = u !== e ? e : ((e)=>{
            let t, r, o = [
                {}
            ];
            for(; t = l.exec(e.replace(a, ""));)t[4] ? o.shift() : t[3] ? (r = t[3].replace(n, " ").trim(), o.unshift(o[0][r] = o[0][r] || {})) : o[0][t[1]] = t[2].replace(n, " ").trim();
            return o[0];
        })(e);
        c[d] = o(p ? {
            ["@keyframes " + d]: t
        } : t, r ? "" : "." + d);
    }
    let f = r && c.g ? c.g : null;
    return r && (c.g = c[d]), ((e, t, r, l)=>{
        l ? t.data = t.data.replace(l, e) : -1 === t.data.indexOf(e) && (t.data = r ? e + t.data : t.data + e);
    })(c[d], t, i, f), d;
}, p = (e, t, r)=>e.reduce((e, l, a)=>{
        let n = t[a];
        if (n && n.call) {
            let e = n(r), t = e && e.props && e.props.className || /^go/.test(e) && e;
            n = t ? "." + t : e && "object" == typeof e ? e.props ? "" : o(e, "") : !1 === e ? "" : e;
        }
        return e + l + (null == n ? "" : n);
    }, "");
function u(e) {
    let r = this || {}, l = e.call ? e(r.p) : e;
    return i(l.unshift ? l.raw ? p(l, [].slice.call(arguments, 1), r.p) : l.reduce((e, t)=>Object.assign(e, t && t.call ? t(r.p) : t), {}) : l, t(r.target), r.g, r.o, r.k);
}
let d, f, g, b = u.bind({
    g: 1
}), h = u.bind({
    k: 1
});
function m(e, t, r, l) {
    o.p = t, d = e, f = r, g = l;
}
function j(e, t) {
    let r = this || {};
    return function() {
        let l = arguments;
        function a(n, o) {
            let c = Object.assign({}, n), s = c.className || a.className;
            r.p = Object.assign({
                theme: f && f()
            }, c), r.o = / *go\d+/.test(s), c.className = u.apply(r, l) + (s ? " " + s : ""), t && (c.ref = o);
            let i = e;
            return e[0] && (i = c.as || e, delete c.as), g && i[0] && g(c), d(i, c);
        }
        return t ? t(a) : a;
    };
}
;
}}),
"[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CheckmarkIcon": (()=>_),
    "ErrorIcon": (()=>k),
    "LoaderIcon": (()=>V),
    "ToastBar": (()=>C),
    "ToastIcon": (()=>M),
    "Toaster": (()=>Oe),
    "default": (()=>Vt),
    "resolveValue": (()=>f),
    "toast": (()=>c),
    "useToaster": (()=>O),
    "useToasterStore": (()=>D)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/goober/dist/goober.modern.js [app-client] (ecmascript)");
"use client";
var W = (e)=>typeof e == "function", f = (e, t)=>W(e) ? e(t) : e;
var F = (()=>{
    let e = 0;
    return ()=>(++e).toString();
})(), A = (()=>{
    let e;
    return ()=>{
        if (e === void 0 && typeof window < "u") {
            let t = matchMedia("(prefers-reduced-motion: reduce)");
            e = !t || t.matches;
        }
        return e;
    };
})();
;
var Y = 20;
var U = (e, t)=>{
    switch(t.type){
        case 0:
            return {
                ...e,
                toasts: [
                    t.toast,
                    ...e.toasts
                ].slice(0, Y)
            };
        case 1:
            return {
                ...e,
                toasts: e.toasts.map((o)=>o.id === t.toast.id ? {
                        ...o,
                        ...t.toast
                    } : o)
            };
        case 2:
            let { toast: r } = t;
            return U(e, {
                type: e.toasts.find((o)=>o.id === r.id) ? 1 : 0,
                toast: r
            });
        case 3:
            let { toastId: s } = t;
            return {
                ...e,
                toasts: e.toasts.map((o)=>o.id === s || s === void 0 ? {
                        ...o,
                        dismissed: !0,
                        visible: !1
                    } : o)
            };
        case 4:
            return t.toastId === void 0 ? {
                ...e,
                toasts: []
            } : {
                ...e,
                toasts: e.toasts.filter((o)=>o.id !== t.toastId)
            };
        case 5:
            return {
                ...e,
                pausedAt: t.time
            };
        case 6:
            let a = t.time - (e.pausedAt || 0);
            return {
                ...e,
                pausedAt: void 0,
                toasts: e.toasts.map((o)=>({
                        ...o,
                        pauseDuration: o.pauseDuration + a
                    }))
            };
    }
}, P = [], y = {
    toasts: [],
    pausedAt: void 0
}, u = (e)=>{
    y = U(y, e), P.forEach((t)=>{
        t(y);
    });
}, q = {
    blank: 4e3,
    error: 4e3,
    success: 2e3,
    loading: 1 / 0,
    custom: 4e3
}, D = (e = {})=>{
    let [t, r] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(y), s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(y);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>(s.current !== y && r(y), P.push(r), ()=>{
            let o = P.indexOf(r);
            o > -1 && P.splice(o, 1);
        }), []);
    let a = t.toasts.map((o)=>{
        var n, i, p;
        return {
            ...e,
            ...e[o.type],
            ...o,
            removeDelay: o.removeDelay || ((n = e[o.type]) == null ? void 0 : n.removeDelay) || (e == null ? void 0 : e.removeDelay),
            duration: o.duration || ((i = e[o.type]) == null ? void 0 : i.duration) || (e == null ? void 0 : e.duration) || q[o.type],
            style: {
                ...e.style,
                ...(p = e[o.type]) == null ? void 0 : p.style,
                ...o.style
            }
        };
    });
    return {
        ...t,
        toasts: a
    };
};
var J = (e, t = "blank", r)=>({
        createdAt: Date.now(),
        visible: !0,
        dismissed: !1,
        type: t,
        ariaProps: {
            role: "status",
            "aria-live": "polite"
        },
        message: e,
        pauseDuration: 0,
        ...r,
        id: (r == null ? void 0 : r.id) || F()
    }), x = (e)=>(t, r)=>{
        let s = J(t, e, r);
        return u({
            type: 2,
            toast: s
        }), s.id;
    }, c = (e, t)=>x("blank")(e, t);
c.error = x("error");
c.success = x("success");
c.loading = x("loading");
c.custom = x("custom");
c.dismiss = (e)=>{
    u({
        type: 3,
        toastId: e
    });
};
c.remove = (e)=>u({
        type: 4,
        toastId: e
    });
c.promise = (e, t, r)=>{
    let s = c.loading(t.loading, {
        ...r,
        ...r == null ? void 0 : r.loading
    });
    return typeof e == "function" && (e = e()), e.then((a)=>{
        let o = t.success ? f(t.success, a) : void 0;
        return o ? c.success(o, {
            id: s,
            ...r,
            ...r == null ? void 0 : r.success
        }) : c.dismiss(s), a;
    }).catch((a)=>{
        let o = t.error ? f(t.error, a) : void 0;
        o ? c.error(o, {
            id: s,
            ...r,
            ...r == null ? void 0 : r.error
        }) : c.dismiss(s);
    }), e;
};
;
var K = (e, t)=>{
    u({
        type: 1,
        toast: {
            id: e,
            height: t
        }
    });
}, X = ()=>{
    u({
        type: 5,
        time: Date.now()
    });
}, b = new Map, Z = 1e3, ee = (e, t = Z)=>{
    if (b.has(e)) return;
    let r = setTimeout(()=>{
        b.delete(e), u({
            type: 4,
            toastId: e
        });
    }, t);
    b.set(e, r);
}, O = (e)=>{
    let { toasts: t, pausedAt: r } = D(e);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (r) return;
        let o = Date.now(), n = t.map((i)=>{
            if (i.duration === 1 / 0) return;
            let p = (i.duration || 0) + i.pauseDuration - (o - i.createdAt);
            if (p < 0) {
                i.visible && c.dismiss(i.id);
                return;
            }
            return setTimeout(()=>c.dismiss(i.id), p);
        });
        return ()=>{
            n.forEach((i)=>i && clearTimeout(i));
        };
    }, [
        t,
        r
    ]);
    let s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        r && u({
            type: 6,
            time: Date.now()
        });
    }, [
        r
    ]), a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((o, n)=>{
        let { reverseOrder: i = !1, gutter: p = 8, defaultPosition: d } = n || {}, h = t.filter((m)=>(m.position || d) === (o.position || d) && m.height), v = h.findIndex((m)=>m.id === o.id), S = h.filter((m, E)=>E < v && m.visible).length;
        return h.filter((m)=>m.visible).slice(...i ? [
            S + 1
        ] : [
            0,
            S
        ]).reduce((m, E)=>m + (E.height || 0) + p, 0);
    }, [
        t
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        t.forEach((o)=>{
            if (o.dismissed) ee(o.id, o.removeDelay);
            else {
                let n = b.get(o.id);
                n && (clearTimeout(n), b.delete(o.id));
            }
        });
    }, [
        t
    ]), {
        toasts: t,
        handlers: {
            updateHeight: K,
            startPause: X,
            endPause: s,
            calculateOffset: a
        }
    };
};
;
;
;
;
;
var oe = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, re = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, se = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, k = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e)=>e.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${oe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${re} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e)=>e.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${se} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;
;
var ne = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, V = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e)=>e.secondary || "#e0e0e0"};
  border-right-color: ${(e)=>e.primary || "#616161"};
  animation: ${ne} 1s linear infinite;
`;
;
var pe = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, de = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e)=>e.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${de} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e)=>e.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;
var ue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  position: absolute;
`, le = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, fe = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, Te = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${fe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, M = ({ toast: e })=>{
    let { icon: t, type: r, iconTheme: s } = e;
    return t !== void 0 ? typeof t == "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(Te, null, t) : t : r === "blank" ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(le, null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(V, {
        ...s
    }), r !== "loading" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(ue, null, r === "error" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(k, {
        ...s
    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(_, {
        ...s
    })));
};
var ye = (e)=>`
0% {transform: translate3d(0,${e * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`, ge = (e)=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e * -150}%,-1px) scale(.6); opacity:0;}
`, he = "0%{opacity:0;} 100%{opacity:1;}", xe = "0%{opacity:1;} 100%{opacity:0;}", be = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, Se = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, Ae = (e, t)=>{
    let s = e.includes("top") ? 1 : -1, [a, o] = A() ? [
        he,
        xe
    ] : [
        ye(s),
        ge(s)
    ];
    return {
        animation: t ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"])(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"])(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`
    };
}, C = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(({ toast: e, position: t, style: r, children: s })=>{
    let a = e.height ? Ae(e.position || t || "top-center", e.visible) : {
        opacity: 0
    }, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(M, {
        toast: e
    }), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(Se, {
        ...e.ariaProps
    }, f(e.message, e));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(be, {
        className: e.className,
        style: {
            ...a,
            ...r,
            ...e.style
        }
    }, typeof s == "function" ? s({
        icon: o,
        message: n
    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, o, n));
});
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setup"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]);
var ve = ({ id: e, className: t, style: r, onHeightUpdate: s, children: a })=>{
    let o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ve.useCallback[o]": (n)=>{
            if (n) {
                let i = {
                    "ve.useCallback[o].i": ()=>{
                        let p = n.getBoundingClientRect().height;
                        s(e, p);
                    }
                }["ve.useCallback[o].i"];
                i(), new MutationObserver(i).observe(n, {
                    subtree: !0,
                    childList: !0,
                    characterData: !0
                });
            }
        }
    }["ve.useCallback[o]"], [
        e,
        s
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("div", {
        ref: o,
        className: t,
        style: r
    }, a);
}, Ee = (e, t)=>{
    let r = e.includes("top"), s = r ? {
        top: 0
    } : {
        bottom: 0
    }, a = e.includes("center") ? {
        justifyContent: "center"
    } : e.includes("right") ? {
        justifyContent: "flex-end"
    } : {};
    return {
        left: 0,
        right: 0,
        display: "flex",
        position: "absolute",
        transition: A() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
        transform: `translateY(${t * (r ? 1 : -1)}px)`,
        ...s,
        ...a
    };
}, De = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"]`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`, R = 16, Oe = ({ reverseOrder: e, position: t = "top-center", toastOptions: r, gutter: s, children: a, containerStyle: o, containerClassName: n })=>{
    let { toasts: i, handlers: p } = O(r);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("div", {
        id: "_rht_toaster",
        style: {
            position: "fixed",
            zIndex: 9999,
            top: R,
            left: R,
            right: R,
            bottom: R,
            pointerEvents: "none",
            ...o
        },
        className: n,
        onMouseEnter: p.startPause,
        onMouseLeave: p.endPause
    }, i.map((d)=>{
        let h = d.position || t, v = p.calculateOffset(d, {
            reverseOrder: e,
            gutter: s,
            defaultPosition: t
        }), S = Ee(h, v);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(ve, {
            id: d.id,
            key: d.id,
            onHeightUpdate: p.updateHeight,
            className: d.visible ? De : "",
            style: S
        }, d.type === "custom" ? f(d.message, d) : a ? a(d) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(C, {
            toast: d,
            position: h
        }));
    }));
};
var Vt = c;
;
 //# sourceMappingURL=index.mjs.map
}}),
}]);

//# sourceMappingURL=_ad773c35._.js.map