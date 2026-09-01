import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  Layers,
  Keyboard,
  ArrowLeftRight,
  Check,
  Flame,
  RotateCcw,
  Loader2,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";

/* ---------------------------------------------------------------
   Geirfa — word data
   Compiled from the Golwg360 comprehension sessions and the
   Datganiad Personol (Athrofa) exercise.
--------------------------------------------------------------- */
const WORDS = [
  // Nouns
  { cy: "grym", en: "power", type: "noun", g: "m", note: "mewn grym = \"in power\"" },
  { cy: "trefnydd", en: "organiser", type: "noun", g: "m" },
  { cy: "dyletswydd", en: "duty, responsibility", type: "noun", g: "f", note: "pl. dyletswyddau" },
  { cy: "etholaeth", en: "constituency", type: "noun", g: "f", note: "pl. etholaethau" },
  { cy: "nod", en: "aim, goal", type: "noun", g: "m" },
  { cy: "dylanwad", en: "influence", type: "noun", g: "m", note: "pl. dylanwadau" },
  { cy: "cyfartaledd", en: "average", type: "noun", g: "m" },
  { cy: "ystadegyn", en: "a statistic", type: "noun", g: "m", note: "pl. ystadegau" },
  { cy: "dirywiad", en: "a decline, deterioration", type: "noun", g: "m" },
  { cy: "gwariant", en: "spending, expenditure", type: "noun", g: "m" },
  { cy: "cyllideb", en: "budget", type: "noun", g: "f", note: "pl. cyllidebau" },
  { cy: "difrifoldeb", en: "seriousness", type: "noun", g: "m" },
  { cy: "lleiafrif", en: "a minority", type: "noun", g: "m", note: "pl. lleiafrifoedd" },
  { cy: "mwyafrif", en: "a majority", type: "noun", g: "m", note: "pl. mwyafrifau/mwyafrifoedd" },
  { cy: "mudiad", en: "a movement, organisation", type: "noun", g: "m", note: "pl. mudiadau" },
  { cy: "urdd", en: "an order, guild, fellowship", type: "noun", g: "f", note: "pl. urddau" },
  { cy: "cynghrair", en: "a league, alliance", type: "noun", g: "f", note: "cyn (\"before\") + crair (\"relic\")" },
  { cy: "seilwaith", en: "infrastructure", type: "noun", g: "m" },
  { cy: "uwchgynhadledd", en: "a summit, a conference", type: "noun", g: "f", note: "pl. uwchgynadleddau" },
  { cy: "athrofa", en: "academy, college, institute", type: "noun", g: "f", note: "pl. athrofâu" },
  { cy: "archwilydd", en: "auditor", type: "noun", g: "m", note: "pl. archwilwyr" },
  { cy: "cydymffurfiaeth", en: "compliance, conformity", type: "noun", g: "f" },
  { cy: "disgyblaeth", en: "discipline", type: "noun", g: "f", note: "pl. disgyblaethau" },
  { cy: "casgliad", en: "a conclusion, a collection", type: "noun", g: "m", note: "pl. casgliadau" },
  { cy: "tystiolaeth", en: "evidence, testimony", type: "noun", g: "f" },
  { cy: "cydol", en: "the whole, entirety", type: "noun", g: "m", note: "trwy gydol = \"throughout\"" },
  { cy: "gweithrediad", en: "operation, function", type: "noun", g: "m", note: "pl. gweithrediadau" },
  { cy: "gweithdrefn", en: "a procedure", type: "noun", g: "f", note: "pl. gweithdrefnau" },
  { cy: "canfyddiad", en: "perception", type: "noun", g: "m", note: "pl. canfyddiadau" },
  { cy: "ymddiriedaeth", en: "trust, confidence", type: "noun", g: "f" },
  { cy: "ymrwymiad", en: "commitment, undertaking", type: "noun", g: "m" },
  { cy: "amddiffynoldeb", en: "defensiveness", type: "noun" },
  { cy: "cydbwysedd", en: "balance, equilibrium", type: "noun", g: "m" },
  { cy: "mewnwelediad", en: "insight", type: "noun", g: "m" },
  { cy: "budd", en: "benefit", type: "noun", g: "m", note: "pl. buddion" },
  { cy: "rhagwelediad", en: "foresight", type: "noun", g: "m" },
  { cy: "brwdfrydedd", en: "enthusiasm, gusto", type: "noun", g: "m" },
  { cy: "rhanddeiliad", en: "stakeholder", type: "noun", g: "m", note: "pl. rhanddeiliaid" },
  { cy: "swyddogaeth", en: "role, function", type: "noun", g: "f", note: "pl. swyddogaethau" },
  { cy: "mewnrwyd", en: "intranet", type: "noun", g: "f" },
  { cy: "gweithlu", en: "workforce, labour force", type: "noun", g: "m" },
  { cy: "barn", en: "opinion, view", type: "noun", g: "f", note: "pl. barnau" },
  { cy: "mewnbwn", en: "input", type: "noun", g: "m", note: "pl. mewnbynnau" },
  { cy: "allbwn", en: "output", type: "noun", g: "m", note: "pl. allbynnau" },
  { cy: "pwn", en: "a pack, a burden, a load", type: "noun", g: "m", note: "soft mut. bwn" },
  { cy: "egwyddor", en: "principle", type: "noun", g: "f", note: "pl. egwyddorion" },
  { cy: "cydraddoldeb", en: "equality, parity", type: "noun", g: "m" },
  { cy: "amrywiaeth", en: "variety, diversity, range", type: "noun", g: "f", note: "pl. amrywiaethau" },
  { cy: "agwedd", en: "attitude, approach, an aspect", type: "noun", g: "f", note: "pl. agweddau" },
  { cy: "parhad", en: "continuation", type: "noun", g: "m" },
  { cy: "trosiant", en: "turnover (business)", type: "noun", g: "m", note: "pl. trosiannau" },
  { cy: "arolygiaeth", en: "an inspectorate", type: "noun", g: "f", note: "pl. arolygiaethau" },
  { cy: "cynghanedd", en: "strict-metre Welsh poetry", type: "noun", g: "f", note: "pl. cynganeddion" },

  // Verbs / verb-nouns
  { cy: "canfod", en: "to discern, perceive; to work out", type: "verb", note: "NOT \"to find\" — that's darganfod" },
  { cy: "dirywio", en: "to decline, deteriorate", type: "verb" },
  { cy: "argoeli", en: "to portend, forecast, augur", type: "verb" },
  { cy: "blaenoriaethu", en: "to prioritise", type: "verb" },
  { cy: "datganoli", en: "to devolve, decentralise", type: "verb" },
  { cy: "etifeddu", en: "to inherit", type: "verb" },
  { cy: "diystyru", en: "to rule out, discount", type: "verb" },
  { cy: "deillio (o)", en: "to derive, stem, originate (from)", type: "verb" },
  { cy: "penodi", en: "to appoint", type: "verb" },
  { cy: "craffu", en: "to observe closely, scrutinise", type: "verb" },
  { cy: "cyfaddawdu", en: "to compromise", type: "verb" },
  { cy: "amddiffyn", en: "to defend, protect", type: "verb" },
  { cy: "allanoli", en: "to externalise, outsource", type: "verb" },
  { cy: "lleihau", en: "to decrease, lessen, reduce", type: "verb" },
  { cy: "ymgysylltu", en: "to engage (with)", type: "verb" },
  { cy: "ysbrydoli", en: "to inspire", type: "verb" },
  { cy: "mabwysiadu", en: "to adopt", type: "verb" },
  { cy: "trochi", en: "to immerse (Gogledd) / to soil (De)", type: "verb", note: "dialect split!" },
  { cy: "cynnal", en: "to hold, support, sustain; to conduct", type: "verb" },
  { cy: "dadlau", en: "to argue; to debate", type: "verb" },
  { cy: "ymddiried (yn)", en: "to trust, to entrust", type: "verb" },
  { cy: "cynrychioli", en: "to represent", type: "verb" },
  { cy: "gwahaniaethu", en: "to discriminate; to distinguish", type: "verb" },
  { cy: "goruchwylio", en: "to oversee, to supervise", type: "verb" },
  { cy: "cwmpasu", en: "to encompass, circumscribe", type: "verb" },
  { cy: "hwyluso", en: "to facilitate, expedite", type: "verb" },
  { cy: "cofnodi", en: "to record, to minute", type: "verb" },

  // Adjectives
  { cy: "sylweddol", en: "significant, substantial", type: "adj" },
  { cy: "prin", en: "scarce, rare / hardly, barely", type: "adj" },
  { cy: "hael", en: "generous", type: "adj" },
  { cy: "diwethaf", en: "last, previous", type: "adj" },
  { cy: "hirdymor", en: "long-term", type: "adj" },
  { cy: "lleiafrifol", en: "minority (as a descriptor)", type: "adj" },
  { cy: "mwyafrifol", en: "majority (as a descriptor)", type: "adj" },
  { cy: "uniongyrchol", en: "direct", type: "adj" },
  { cy: "cysgodol", en: "sheltered, shady / (political) shadow", type: "adj" },
  { cy: "segur", en: "dormant, idle, inactive", type: "adj" },
  { cy: "diduedd", en: "impartial, unbiased", type: "adj" },
  { cy: "gelyniaethus", en: "hostile, antagonistic", type: "adj" },
  { cy: "cydweithredol", en: "collaborative, cooperative", type: "adj" },
  { cy: "eang", en: "broad, wide, extensive", type: "adj", note: "comp. ehangach" },
  { cy: "gwasgaredig", en: "scattered, dispersed", type: "adj" },
  { cy: "sylfaenol", en: "fundamental; basic", type: "adj" },
  { cy: "hirsefydlog", en: "long-standing", type: "adj" },
  { cy: "gweithredol", en: "executive, operational", type: "adj" },
  { cy: "atebol", en: "accountable, answerable / (Gogledd) able", type: "adj" },
  { cy: "siomedig", en: "disappointed / disappointing", type: "adj" },
  { cy: "annerbyniol", en: "unacceptable", type: "adj" },

  // Prepositions / particles
  { cy: "am", en: "for / to, towards / to want to", type: "prep", note: "three senses!" },
  { cy: "real", en: "\"real\" — only in termau real", type: "adj" },

  // Idioms & fixed phrases
  { cy: "yr hyn", en: "that which, what", type: "idiom" },
  { cy: "mynd rhagddo", en: "to progress, proceed", type: "idiom" },
  { cy: "dod â...yn fyw", en: "to bring something to life", type: "idiom" },
  { cy: "mynd i'r afael â", en: "to get to grips with, tackle", type: "idiom" },
  { cy: "math o", en: "a kind of, sort of", type: "idiom" },
  { cy: "o ran", en: "in terms of, regarding", type: "idiom" },
  { cy: "ar lawr gwlad", en: "at grassroots level", type: "idiom" },
  { cy: "ni waeth", en: "it doesn't matter, no matter", type: "idiom" },
  { cy: "gan gynnwys", en: "including", type: "idiom" },
  { cy: "dal ati", en: "to keep at it, persevere", type: "idiom" },
  { cy: "dal barn", en: "to merely hold an opinion", type: "idiom" },
  { cy: "gellid", en: "one could, it could be [done]", type: "idiom" },
  { cy: "ei hun", en: "[possessor]'s own", type: "idiom", note: "e.g. yr Athrofa ei hun" },

  // Despite cluster
  { cy: "er", en: "despite, although (neutral)", type: "idiom" },
  { cy: "serch", en: "despite (literary/journalistic)", type: "idiom" },
  { cy: "serch hynny", en: "despite that, nevertheless", type: "idiom" },
  { cy: "er gwaethaf", en: "despite, in spite of (emphatic)", type: "idiom" },

  // Encourage / promote cluster
  { cy: "annog", en: "to urge, exhort, encourage", type: "verb" },
  { cy: "calonogi", en: "to hearten, encourage", type: "verb" },
  { cy: "cymell", en: "to urge, coax, incite", type: "verb" },
  { cy: "symbylu", en: "to encourage, stimulate", type: "verb" },
  { cy: "cefnogi", en: "to support, encourage, back", type: "verb" },
  { cy: "hybu", en: "to promote, foster", type: "verb" },
  { cy: "ennyn", en: "to kindle, ignite, evoke", type: "verb" },
  { cy: "meithrin", en: "to nurture, cultivate, rear", type: "verb" },
  { cy: "hyrwyddo", en: "to promote, further", type: "verb" },

  // Proper nouns
  { cy: "Yr Iwerydd", en: "the Atlantic", type: "proper" },
  { cy: "Iwerddon", en: "Ireland", type: "proper" },
  { cy: "Gwyddel", en: "an Irishman", type: "noun", g: "m", note: "pl. Gwyddelod" },
  { cy: "Gwyddeles", en: "an Irishwoman", type: "noun", g: "f" },
  { cy: "Y Brifwyl", en: "the National Eisteddfod", type: "proper" },
  { cy: "San Steffan", en: "Westminster", type: "proper" },
  { cy: "Ystad y Goron", en: "the Crown Estate", type: "proper" },

  // Uwch 2 — Uned 8 (Chwaraeon)
  { cy: "gorfoledd", en: "elation, jubilation, rejoicing", type: "noun", g: "m", note: "pl. gorfoleddau" },
  { cy: "cydlynu", en: "to coordinate", type: "verb" },
  { cy: "loncian", en: "to jog", type: "verb" },
  { cy: "rhwyfo", en: "to row (a boat)", type: "verb" },
  { cy: "gorfodol", en: "compulsory, mandatory, obligatory", type: "adj", note: "not gorfoledd (elation)!" },
  { cy: "cyfyngedig", en: "limited", type: "adj" },
  { cy: "rhyfeddol", en: "amazing, wonderful", type: "adj" },
  { cy: "ar draul", en: "at the expense of", type: "idiom" },
  { cy: "llwyddiant ysgubol", en: "a resounding success", type: "idiom" },

  // Golwg360 — Tafarndai Cymunedol (Lois Povey)
  { cy: "darlun", en: "a picture, illustration, portrait", type: "noun", g: "m", note: "pl. darluniau" },
  { cy: "print", en: "a print, printed picture", type: "noun", g: "m", note: "pl. printiau" },
  { cy: "call", en: "sensible, wise, sane, smart", type: "adj" },
  { cy: "fel arall", en: "otherwise", type: "idiom" },
  { cy: "gweithgarwch", en: "activity, diligence, industry", type: "noun", g: "m" },
  { cy: "Ymbweru Bro", en: "Community Empowerment", type: "proper" },
  { cy: "wrth reswm", en: "naturally, of course", type: "idiom" },
  { cy: "cyfranddaliad", en: "a shareholding", type: "noun", g: "m", note: "pl. cyfranddaliadau" },

  // Intensifiers: [word] o [adjective]
  { cy: "ofnadwy", en: "terrible, awful, really, awfully", type: "adj/intensifier" },
  { cy: "uffernol", en: "hellish, infernal, terribly", type: "adj/intensifier" },
  { cy: "aruthrol", en: "immense, tremendous, tremendously", type: "adj/intensifier" },
  { cy: "hynod", en: "remarkable, notable, particularly", type: "adj/intensifier" },
  { cy: "sobor", en: "abysmal, awful, incredibly", type: "adj/intensifier" },
  { cy: "andros", en: "good heavens, incredibly", type: "exclamation/intensifier" },
  { cy: "[adj.] o beth", en: "a [adjective] thing/matter", type: "pattern", note: "e.g. ffantastig o beth, \"a fantastic thing\"" },
];

const norm = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOP = new Set([
  "a", "an", "the", "to", "of", "in", "on", "with", "for", "or", "and",
  "someone", "something", "s", "it", "its", "one", "be", "is",
]);

function significantTokens(s) {
  return norm(s)
    .split(" ")
    .filter((t) => t && !STOP.has(t));
}

// Levenshtein edit distance — how many single-character insertions,
// deletions, or substitutions separate two words.
function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return dp[m][n];
}

// Tolerance scales with word length — short words get no leeway at all
// (too easy to accidentally match a different real word), longer words
// get a little more room for a genuine typo.
function fuzzyTolerance(len) {
  if (len <= 3) return 0;
  if (len <= 7) return 1;
  return 2;
}

function tokenMatches(typedTok, expectedTok, allowFuzzy) {
  if (typedTok === expectedTok) return true;
  if (!allowFuzzy) return false;
  const tol = fuzzyTolerance(expectedTok.length);
  if (tol === 0) return false;
  return levenshtein(typedTok, expectedTok) <= tol;
}

// allowFuzzy should only ever be true when the person is typing an ENGLISH
// answer. Welsh answers stay exact — a single letter (or a missing to bach)
// can be the entire difference between two unrelated Welsh words, or between
// a mutated and unmutated form, so fuzzy tolerance there could silently
// mask exactly the kind of mutation error this app exists to catch.
function isLikelyCorrect(typed, expected, allowFuzzy) {
  const t = norm(typed);
  if (!t) return false;

  // Split the gloss into its real alternative senses — "sheltered, shady /
  // (political) shadow" means THREE separate acceptable answers, not one
  // combined phrase you need to reproduce in full.
  const withoutParens = expected.replace(/\([^)]*\)/g, " ");
  const alternatives = withoutParens
    .split(/[,/;]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const candidates = alternatives.length ? alternatives : [expected];

  const tTokens = significantTokens(typed);

  return candidates.some((alt) => {
    const e = norm(alt);
    if (!e) return false;
    if (t === e) return true;
    const eTok = significantTokens(alt);
    if (eTok.length === 0) return false;
    const hits = eTok.filter((etok) =>
      tTokens.some((ttok) => tokenMatches(ttok, etok, allowFuzzy))
    ).length;
    return hits / eTok.length >= 0.5;
  });
}

const STATUS = { NEW: "new", STRUGGLING: "struggling", MASTERED: "mastered" };
const WEIGHT = { new: 3, struggling: 6, mastered: 1 };

function pickWeighted(items, progress, avoidId) {
  const pool = items.filter((w) => w.id !== avoidId || items.length === 1);
  const weights = pool.map((w) => WEIGHT[progress[w.id] || STATUS.NEW]);
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

const STORAGE_KEY = "geirfa-progress-v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export default function App() {
  const items = useMemo(
    () =>
      WORDS.map((w) => ({
        ...w,
        id: norm(w.cy).replace(/\s+/g, "-"),
      })),
    []
  );

  const [progress, setProgress] = useState(loadProgress);
  const [current, setCurrent] = useState(null);
  const [mode, setMode] = useState("flashcard"); // 'flashcard' | 'type'
  const [direction, setDirection] = useState("cy-en"); // 'cy-en' | 'en-cy'
  const [flipped, setFlipped] = useState(false);
  const [typed, setTyped] = useState("");
  const [verdict, setVerdict] = useState(null); // null | 'correct' | 'incorrect'
  const [sessionSeen, setSessionSeen] = useState(0);

  // Welsh pronunciation, via Bangor University's free Techiaith TTS API
  // (api.techiaith.cymru/speak/v3) — a genuine Welsh voice, not a browser
  // system voice (no such thing is currently available on most devices).
  // We use their Piper model in Welsh-only mode ("cy") with a Gogledd
  // speaker, since it's the fastest/most predictable engine for short,
  // isolated words, and Welsh-only mode avoids any risk of a short word
  // being mis-detected as English by the bilingual model.
  const [speaking, setSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const audioRef = useRef(null);

  const speakWelsh = useCallback((text) => {
    setSpeechError(null);
    setSpeaking(true);
    const url =
      "https://api.techiaith.cymru/speak/v3/api/piper?text=" +
      encodeURIComponent(text) +
      "&speaker_id=gwryw-gogledd-pro&model=cy";

    // <audio src> rather than fetch() — fetch() to this domain gets
    // blocked outright ("Failed to fetch", a CORS wall), but <audio>
    // tag loading doesn't need CORS just to play, so it has a real
    // chance of working once Bangor's own service is back up. We lose
    // the ability to read the exact HTTP status this way, so the
    // message stays generic — but it's honest, and short.
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => setSpeaking(false);
    audio.onerror = () => {
      setSpeaking(false);
      setSpeechError("Methu clywed y gair — gwasanaeth i lawr, neu broblem gysylltu");
    };
    audio.play().catch((err) => {
      setSpeaking(false);
      setSpeechError("Methu chwarae (" + (err.name || "gwall") + ")");
    });
  }, []);

  const [attempted, setAttempted] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const inputRef = useRef(null);

  // Pick the first word on mount (localStorage is synchronous, so
  // progress is already available — no async loading gate needed).
  useEffect(() => {
    if (!current) {
      setCurrent(pickWeighted(items, progress, null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveProgress = useCallback((next) => {
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Couldn't save progress", e);
    }
  }, []);

  const setStatus = (id, status) => {
    const next = { ...progress, [id]: status };
    saveProgress(next);
  };

  const nextWord = useCallback(() => {
    setCurrent((prev) => pickWeighted(items, progress, prev ? prev.id : null));
    setFlipped(false);
    setTyped("");
    setVerdict(null);
    setSessionSeen((n) => n + 1);
    setSpeechError(null);
    setSpeaking(false);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
  }, [items, progress]);

  // Let Return/Enter activate "Nesaf" whenever the answer is already showing —
  // refs avoid stale-closure issues in a window-level listener.
  const modeRef = useRef(mode);
  const flippedRef = useRef(flipped);
  const verdictRef = useRef(verdict);
  const lastCheckAtRef = useRef(0);
  useEffect(() => {
    modeRef.current = mode;
    flippedRef.current = flipped;
    verdictRef.current = verdict;
  }, [mode, flipped, verdict]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== "Enter" || e.repeat) return;
      // Small cooldown after a check just fired, so an OS/browser key-repeat
      // (or a fast double-press) can't immediately fire "next" before you've
      // had a chance to actually see the result.
      if (Date.now() - lastCheckAtRef.current < 350) return;
      const answerShown =
        modeRef.current === "flashcard" ? flippedRef.current : verdictRef.current !== null;
      if (answerShown) {
        e.preventDefault();
        nextWord();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextWord]);

  const counts = useMemo(() => {
    const c = { new: 0, struggling: 0, mastered: 0 };
    items.forEach((w) => {
      const s = progress[w.id] || STATUS.NEW;
      c[s] += 1;
    });
    return c;
  }, [items, progress]);

  const resetAll = () => {
    saveProgress({});
  };

  if (!current) {
    return (
      <Shell>
        <div className="loading-wrap">
          <Loader2 className="spin" size={28} />
          <p className="mono small muted">Yn llwytho'r geirfa…</p>
        </div>
      </Shell>
    );
  }

  const prompt = direction === "cy-en" ? current.cy : current.en;
  const answer = direction === "cy-en" ? current.en : current.cy;
  const promptIsWelsh = direction === "cy-en";
  const wordColor =
    current.g === "m" ? "#7FB0E0" : current.g === "f" ? "#E896B8" : undefined;
  const status = progress[current.id] || STATUS.NEW;

  const showAnswer = mode === "flashcard" ? flipped : verdict !== null;

  const handleCheck = () => {
    const ok = isLikelyCorrect(typed, answer, promptIsWelsh);
    setVerdict(ok ? "correct" : "incorrect");
    setAttempted((n) => n + 1);
    if (ok) setCorrectCount((n) => n + 1);
    lastCheckAtRef.current = Date.now();
  };

  const handleOverride = () => {
    setVerdict((v) => {
      const flipped = v === "correct" ? "incorrect" : "correct";
      setCorrectCount((n) => (flipped === "correct" ? n + 1 : Math.max(0, n - 1)));
      return flipped;
    });
  };

  const handleFlip = () => setFlipped((f) => !f);

  const cardStatusClass =
    status === "struggling" ? "card-struggling" : status === "mastered" ? "card-mastered" : "card-new";

  return (
    <Shell>
      {/* Header controls */}
      <div className="row-between wrap gap-3 mb-6">
        <div className="row gap-3 mono xs muted">
          <StatPill label="Heb farcio" value={counts.new} dotClass="dot-slateblue" />
          <StatPill label="Yn anodd" value={counts.struggling} dotClass="dot-gorse" />
          <StatPill label="Meistrolwyd" value={counts.mastered} dotClass="dot-moss" />
        </div>
        <button onClick={resetAll} className="ghost-btn mono xs">
          <RotateCcw size={13} />
          Ailosod cynnydd
        </button>
      </div>

      {attempted > 0 && (
        <div className="accuracy-row mono xs muted mb-6">
          Cywirdeb y sesiwn:{" "}
          <span className="accuracy-value">
            {Math.round((correctCount / attempted) * 100)}%
          </span>{" "}
          ({correctCount}/{attempted})
        </div>
      )}

      {/* Mode / direction toggles */}
      <div className="row wrap gap-2 mb-6">
        <ToggleGroup>
          <ToggleButton
            active={mode === "flashcard"}
            onClick={() => {
              setMode("flashcard");
              setVerdict(null);
              setTyped("");
              setSpeechError(null);
            }}
          >
            <Layers size={14} /> Fflachgardiau
          </ToggleButton>
          <ToggleButton
            active={mode === "type"}
            onClick={() => {
              setMode("type");
              setFlipped(false);
              setSpeechError(null);
            }}
          >
            <Keyboard size={14} /> Teipio
          </ToggleButton>
        </ToggleGroup>

        <button
          onClick={() => {
            setDirection((d) => (d === "cy-en" ? "en-cy" : "cy-en"));
            setFlipped(false);
            setTyped("");
            setVerdict(null);
            setSpeechError(null);
          }}
          className="pill-btn mono xs"
        >
          <ArrowLeftRight size={13} />
          {direction === "cy-en" ? "Cymraeg → Saesneg" : "Saesneg → Cymraeg"}
        </button>
      </div>

      {/* The card */}
      <div className={`slate-card ${cardStatusClass}`}>
        <div className="row-between mb-6">
          <div className="row gap-2">
            <span className="mono xxs uppercase muted spaced">{current.type || ""}</span>
            {current.g && <GenderBadge g={current.g} />}
          </div>
          {status !== STATUS.NEW && (
            <span
              className={`mono xxs uppercase spaced ${status === "struggling" ? "text-gorse" : "text-moss"}`}
            >
              {status === "struggling" ? "Yn anodd" : "Meistrolwyd"}
            </span>
          )}
        </div>

        <div className="prompt-area">
          <div className="word-row">
            <p
              className="chalk-display prompt-text"
              style={promptIsWelsh && wordColor ? { color: wordColor } : undefined}
            >
              {prompt}
            </p>
            {promptIsWelsh && (
              <button
                onClick={() => speakWelsh(current.cy)}
                disabled={speaking}
                className={`speak-btn ${speechError ? "speak-btn-error" : ""}`}
                title={speechError ? speechError + " (cliciwch eto)" : "Gwrando"}
              >
                {speaking ? (
                  <Loader2 size={20} className="spin" />
                ) : speechError ? (
                  <VolumeX size={20} />
                ) : (
                  <Volume2 size={20} />
                )}
              </button>
            )}
          </div>

          {showAnswer && (
            <div className="answer-area">
              <div className="word-row">
                <p
                  className="answer-text"
                  style={!promptIsWelsh && wordColor ? { color: wordColor } : undefined}
                >
                  {answer}
                </p>
                {!promptIsWelsh && (
                  <button
                    onClick={() => speakWelsh(current.cy)}
                    disabled={speaking}
                    className={`speak-btn ${speechError ? "speak-btn-error" : ""}`}
                    title={speechError ? speechError + " (cliciwch eto)" : "Gwrando"}
                  >
                    {speaking ? (
                      <Loader2 size={18} className="spin" />
                    ) : speechError ? (
                      <VolumeX size={18} />
                    ) : (
                      <Volume2 size={18} />
                    )}
                  </button>
                )}
              </div>
              {current.note && <p className="note-text">{current.note}</p>}
            </div>
          )}
        </div>

        {/* Interaction area */}
        {mode === "flashcard" ? (
          !flipped && (
            <button onClick={handleFlip} className="reveal-btn mono small">
              Dangos yr ateb
            </button>
          )
        ) : (
          verdict === null && (
            <div className="type-row">
              <input
                ref={inputRef}
                autoFocus
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCheck();
                  }
                }}
                placeholder="Teipiwch eich ateb…"
                className="type-input"
              />
              <button type="button" onClick={handleCheck} className="check-btn">
                Gwirio
              </button>
            </div>
          )
        )}

        {mode === "type" && verdict !== null && (
          <div className={`verdict-row mono small ${verdict === "correct" ? "text-moss" : "text-gorse"}`}>
            {verdict === "correct" ? <Check size={16} /> : <Flame size={16} />}
            {verdict === "correct" ? "Da iawn — cywir!" : "Ddim cweit — dyma'r ateb cywir."}
            <button onClick={handleOverride} className="link-btn muted">
              newid barn
            </button>
          </div>
        )}
      </div>

      {/* Flag + next controls, once answer is visible */}
      {showAnswer && (
        <div className="row wrap gap-2 controls-row">
          <FlagButton
            active={status === "struggling"}
            variant="gorse"
            onClick={() => setStatus(current.id, STATUS.STRUGGLING)}
          >
            <Flame size={14} /> Yn anodd
          </FlagButton>
          <FlagButton
            active={status === "mastered"}
            variant="moss"
            onClick={() => setStatus(current.id, STATUS.MASTERED)}
          >
            <Check size={14} /> Meistrolwyd
          </FlagButton>

          <button onClick={nextWord} className="next-btn">
            Nesaf
            <ChevronRight size={15} />
          </button>
        </div>
      )}

      <p className="footer-text mono xxs muted">
        {items.length} gair yn y gronfa · {sessionSeen} wedi'u gweld y sesiwn yma
      </p>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div className="geirfa-outer">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .geirfa-outer {
          min-height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 24px 16px;
          background: #23262B;
          font-family: 'Work Sans', sans-serif;
          box-sizing: border-box;
          overflow-x: hidden;
        }
        .geirfa-outer *, .geirfa-outer *::before, .geirfa-outer *::after { box-sizing: border-box; }
        .geirfa-root { width: 100%; max-width: 560px; }

        .chalk-display { font-family: 'Big Shoulders Display', sans-serif; font-weight: 700; letter-spacing: 0.01em; color: #F1EDE4; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .small { font-size: 13px; }
        .xs { font-size: 12px; }
        .xxs { font-size: 11px; }
        .muted { color: #9BA3AD; }
        .uppercase { text-transform: uppercase; }
        .spaced { letter-spacing: 0.08em; }
        .text-gorse { color: #E3A33E; }
        .text-moss { color: #6FA287; }

        .gender-badge {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 2px 7px;
          border-radius: 999px;
          border: 1px solid;
        }
        .gender-m { color: #7FB0E0; border-color: rgba(127,176,224,0.45); background: rgba(127,176,224,0.12); }
        .gender-f { color: #E896B8; border-color: rgba(232,150,184,0.45); background: rgba(232,150,184,0.12); }

        .row { display: flex; align-items: center; }
        .row-between { display: flex; align-items: center; justify-content: space-between; }
        .wrap { flex-wrap: wrap; }
        .gap-2 { gap: 8px; }
        .gap-3 { gap: 12px; }
        .mb-6 { margin-bottom: 22px; }

        .geirfa-header { margin-bottom: 22px; }
        .geirfa-header h1 { font-size: 26px; margin: 0; }
        .geirfa-header p { color: #9BA3AD; font-size: 14px; margin: 4px 0 0; }

        .dot { width: 6px; height: 6px; border-radius: 999px; display: inline-block; margin-right: 6px; }
        .dot-slateblue { background: #7C93A8; }
        .dot-gorse { background: #E3A33E; }
        .dot-moss { background: #6FA287; }
        .stat-pill { display: flex; align-items: center; }

        .accuracy-row { padding: 2px 0; }
        .accuracy-value { color: #F1EDE4; font-weight: 500; }

        .ghost-btn {
          display: flex; align-items: center; gap: 6px;
          background: transparent; border: none; color: #9BA3AD;
          padding: 6px 8px; border-radius: 8px; cursor: pointer;
          transition: color 0.15s ease;
        }
        .ghost-btn:hover { color: #F1EDE4; }

        .pill-btn {
          display: flex; align-items: center; gap: 6px;
          background: transparent; border: 1px solid rgba(255,255,255,0.12);
          color: #9BA3AD; padding: 7px 14px; border-radius: 999px; cursor: pointer;
          transition: all 0.15s ease;
        }
        .pill-btn:hover { color: #F1EDE4; border-color: rgba(255,255,255,0.3); }

        .toggle-group {
          display: flex; border: 1px solid rgba(255,255,255,0.1); border-radius: 999px;
          padding: 3px; background: rgba(0,0,0,0.2);
        }
        .toggle-btn {
          display: flex; align-items: center; gap: 6px;
          background: transparent; border: none; color: #9BA3AD;
          padding: 7px 14px; border-radius: 999px; cursor: pointer;
          font-family: 'IBM Plex Mono', monospace; font-size: 12px;
          transition: all 0.15s ease;
        }
        .toggle-btn.active { background: #F1EDE4; color: #171A1E; }
        .toggle-btn:not(.active):hover { color: #F1EDE4; }

        .slate-card {
          background: linear-gradient(155deg, #34383F 0%, #2C2F35 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 30px -12px rgba(0,0,0,0.55);
          border-radius: 18px;
          padding: clamp(22px, 5vw, 34px) clamp(18px, 4.5vw, 28px);
          margin-bottom: 18px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .card-struggling { border-color: rgba(227,163,62,0.55); box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 3px rgba(227,163,62,0.12), 0 12px 30px -12px rgba(0,0,0,0.55); }
        .card-mastered { border-color: rgba(111,162,135,0.55); box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 3px rgba(111,162,135,0.12), 0 12px 30px -12px rgba(0,0,0,0.55); }

        .prompt-area { min-height: 110px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .word-row { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .speak-btn {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 999px; flex-shrink: 0;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          color: #F1EDE4; cursor: pointer; transition: all 0.15s ease;
        }
        .speak-btn:hover:not(:disabled) { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.3); }
        .speak-btn:disabled { color: #5B6169; cursor: not-allowed; opacity: 0.6; }
        .speak-btn-error { border-color: rgba(227,163,62,0.5); color: #E3A33E; }
        .speak-btn-error:hover:not(:disabled) { border-color: #E3A33E; background: rgba(227,163,62,0.12); }
        .prompt-text {
          font-size: clamp(24px, 6.5vw, 34px);
          margin: 0;
          word-break: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
        }
        .answer-area { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); width: 100%; }
        .answer-text {
          font-size: clamp(17px, 4.5vw, 22px);
          color: rgba(241,237,228,0.92);
          margin: 0;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .note-text { font-size: 13px; color: #9BA3AD; font-style: italic; margin: 8px 0 0; }

        .reveal-btn {
          margin-top: 30px; width: 100%; border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.15); background: transparent;
          color: #9BA3AD; padding: 13px; cursor: pointer;
          transition: all 0.15s ease;
        }
        .reveal-btn:hover { color: #F1EDE4; border-color: rgba(255,255,255,0.35); }

        .type-row { margin-top: 30px; display: flex; gap: 8px; }
        .type-input {
          flex: 1; border-radius: 12px; background: rgba(0,0,0,0.22);
          border: 1px solid rgba(255,255,255,0.15); padding: 13px 16px;
          color: #F1EDE4; font-size: 15px; font-family: 'Work Sans', sans-serif;
          outline: none; transition: border-color 0.15s ease;
        }
        .type-input::placeholder { color: rgba(155,163,173,0.6); }
        .type-input:focus { border-color: #7C93A8; }
        .check-btn {
          border-radius: 12px; padding: 13px 22px; background: #7C93A8;
          color: #171A1E; font-weight: 500; font-size: 14px; border: none; cursor: pointer;
          transition: filter 0.15s ease;
        }
        .check-btn:hover { filter: brightness(1.1); }

        .verdict-row { margin-top: 22px; display: flex; align-items: center; gap: 8px; }
        .link-btn {
          margin-left: auto; background: none; border: none; cursor: pointer;
          text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 4px;
          font-family: 'IBM Plex Mono', monospace; font-size: 12px;
        }
        .link-btn:hover { color: #F1EDE4; }

        .controls-row { align-items: center; }
        .flag-btn {
          display: flex; align-items: center; gap: 6px;
          border-radius: 999px; padding: 10px 16px; font-size: 12px;
          min-height: 40px;
          font-family: 'IBM Plex Mono', monospace; cursor: pointer; background: transparent;
          border: 1px solid; transition: all 0.15s ease;
        }
        .flag-gorse { color: #E3A33E; border-color: rgba(227,163,62,0.4); }
        .flag-gorse:hover { border-color: #E3A33E; }
        .flag-gorse.active { background: rgba(227,163,62,0.15); border-color: #E3A33E; }
        .flag-moss { color: #6FA287; border-color: rgba(111,162,135,0.4); }
        .flag-moss:hover { border-color: #6FA287; }
        .flag-moss.active { background: rgba(111,162,135,0.15); border-color: #6FA287; }

        .next-btn {
          margin-left: auto; display: flex; align-items: center; gap: 6px;
          border-radius: 999px; background: #F1EDE4; color: #171A1E;
          padding: 11px 22px; min-height: 40px; font-size: 14px; font-weight: 500; border: none; cursor: pointer;
          transition: filter 0.15s ease;
        }
        .next-btn:hover { filter: brightness(0.95); }

        .footer-text { margin-top: 30px; text-align: center; }

        .loading-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 96px 0; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (max-width: 480px) {
          .slate-card { padding: clamp(18px, 6vw, 26px) 16px; }
          .geirfa-header h1 { font-size: 22px; }
          .flag-btn, .next-btn { font-size: 12px; padding: 10px 14px; }
        }

        @media (max-width: 380px) {
          .type-row { flex-direction: column; }
          .check-btn { width: 100%; }
          .controls-row { flex-direction: column; align-items: stretch; }
          .next-btn { margin-left: 0; justify-content: center; }
        }

        @media (min-width: 900px) {
          .geirfa-root { max-width: 640px; }
          .geirfa-header h1 { font-size: 30px; }
          .slate-card { padding: 40px 36px; }
        }
      `}</style>
      <div className="geirfa-root">
        <header className="geirfa-header">
          <h1 className="chalk-display">Geirfa</h1>
          <p>Adolygu Geirfa Gymraeg — Revising Welsh Vocabulary</p>
        </header>
        {children}
      </div>
    </div>
  );
}

function GenderBadge({ g }) {
  const isMasc = g === "m";
  return (
    <span className={`gender-badge ${isMasc ? "gender-m" : "gender-f"}`}>
      {isMasc ? "g." : "b."}
    </span>
  );
}

function StatPill({ label, value, dotClass }) {
  return (
    <span className="stat-pill">
      <span className={`dot ${dotClass}`} />
      {label} {value}
    </span>
  );
}

function ToggleGroup({ children }) {
  return <div className="toggle-group">{children}</div>;
}

function ToggleButton({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`toggle-btn ${active ? "active" : ""}`}>
      {children}
    </button>
  );
}

function FlagButton({ active, variant, onClick, children }) {
  return (
    <button onClick={onClick} className={`flag-btn flag-${variant} ${active ? "active" : ""}`}>
      {children}
    </button>
  );
}
