# SchoolMattazz
## Product Requirements Document (PRD) · Functional Requirements Document (FRD) · MVP Definition

**Version:** 1.0
**Date:** June 2026
**Owner:** SchoolMattazz
**Status:** Ready for Development

---

# PART 1 — PROJECT SUMMARY

SchoolMattazz is a Nigerian-first, gamified examination preparation platform that serves students preparing for JAMB, WAEC, NECO, GCE (General Certificate Examination), and Post UTME. It combines structured academic content (past questions, video lessons, CBT mock exams) with a rewards economy (points, badges, leaderboard, wallet payouts) and a creator marketplace where certified teachers publish and monetize their own video lessons and textbooks.

The platform is built on three interlocking pillars:

**1. Learn** — Subject-gated content access based on each student's chosen exam type, department, and subjects. Every student only sees content relevant to their exact combination, keeping the experience focused and personalised.

**2. Compete** — A peer-matched competition system using a subject fingerprint (SHA-256 hash of the student's subject set). Students only compete against others who chose the exact same exam type and subjects, making every leaderboard and quiz battle a fair fight.

**3. Earn** — A full reward economy: points for every meaningful action (logins, quizzes, videos, referrals, forum posts), redeemable for airtime, data, cash, or premium subscriptions. A built-in wallet holds all earnings, supports peer transfers, and processes bank withdrawals.

---

# PART 2 — PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 2.1 Problem Statement

Nigerian secondary school and university-entrance students face three interconnected problems:

1. **Access** — Quality exam preparation materials are expensive, scattered, and often in formats (thick textbooks, expensive tutorials) that are inaccessible to students in low-income households or underserved states.

2. **Motivation** — Studying alone without feedback, progress tracking, or social accountability leads to inconsistency. Students start strong and drop off.

3. **Monetisation gap** — Nigeria has thousands of excellent private tutors who lack the infrastructure to reach students at scale, set up payments, or protect their content.

SchoolMattazz solves all three: free-tier access removes the barrier, gamification solves motivation, and the creator marketplace gives tutors a structured, revenue-sharing storefront.

---

## 2.2 Target Users

| Persona | Description | Primary Goal |
|---|---|---|
| **SS3 student** | 15–18, preparing for WAEC/NECO or JAMB first attempt | Pass exams with good grades |
| **JAMB retaker** | 17–22, failed or underwhelmed first UTME attempt | Score 250+ for university admission |
| **Post UTME candidate** | 18–23, admitted conditionally, needs Post UTME screening | Secure university admission |
| **GCE private candidate** | Any age, sitting exams independently outside school | Pass without a school support system |
| **Certified tutor / creator** | Graduate or experienced teacher, 22–45 | Monetise expertise and reach more students |
| **Parent** | 35–55, paying for child's subscription | Ensure child is preparing effectively |

---

## 2.3 Business Goals

| Goal | Metric | Target (Year 1) |
|---|---|---|
| Student acquisition | Registered accounts | 500,000 |
| Paid conversions | Active subscriptions | 50,000 (10%) |
| Creator ecosystem | Verified creators | 500 |
| Revenue | Monthly Recurring Revenue | ₦15,000,000/month |
| Engagement | Daily Active Users | 30% of registered base |
| Retention | 30-day retention | 60% |
| Referrals | % signups via referral | 35% |

---

## 2.4 Success Metrics

- **Quiz completion rate:** >70% of started quizzes are submitted
- **Daily login streak:** Average streak >5 days across active users
- **Creator revenue:** Average Gold creator earns >₦80,000/month
- **NPS (Net Promoter Score):** >60
- **Wallet transaction volume:** >₦50M/month within 6 months of launch
- **Subject fingerprint match rate:** >80% of battles find a peer within 30 seconds

---

## 2.5 User Journey Overview

```
STUDENT JOURNEY
────────────────────────────────────────────────────────
Discover (social/referral)
    ↓
Create account (email / Google / OTP)
    ↓
Onboarding: Choose exam type → department → subjects (4 or 9)
    ↓
Dashboard: Subject-gated content loads
    ↓
Study: Videos → Past Questions → Mock CBT
    ↓
Earn Points: Login streaks, quiz scores, referrals
    ↓
Compete: Quiz battles → Weekly Challenge → Leaderboard
    ↓
Redeem: Airtime / Data / Cash → Wallet → Bank withdrawal
    ↓
Upgrade: Basic → Standard → Premium subscription

CREATOR JOURNEY
────────────────────────────────────────────────────────
Register account
    ↓
Creator onboarding: Choose tier (Silver/Gold/Platinum)
    ↓
Pay monthly subscription fee
    ↓
Upload videos / textbooks → Admin review (24h)
    ↓
Content goes live → Students purchase per-video/textbook
    ↓
Earnings split (60/70/80%) credited to creator wallet
    ↓
Request payout → Admin approves → Bank withdrawal
```

---

## 2.6 Platform Constraints

- **Bandwidth-first:** All content optimised for low-data Nigerian mobile connections. Videos encoded for low bandwidth. Lazy loading everywhere.
- **Mobile-first:** >75% of target users are on smartphones. All screens designed mobile-first, responsive down to 320px.
- **Nigeria-primary, globally accessible:** Paystack/Flutterwave for NGN. Stripe/PayPal for international. Multi-currency wallet.
- **Offline-ready:** Key features (downloaded PDFs, cached past questions) available without active internet.
- **Language:** English (primary). Yoruba, Igbo, Hausa subject content supported.

---

# PART 3 — FUNCTIONAL REQUIREMENTS DOCUMENT (FRD)

## 3.1 Authentication & User Management

| Ref | Requirement | Priority |
|---|---|---|
| AUTH-01 | Email/password signup with bcrypt hashing (12 rounds) | Must |
| AUTH-02 | Google OAuth login via Firebase Admin SDK | Must |
| AUTH-03 | SMS OTP verification via Termii for Nigerian numbers | Must |
| AUTH-04 | JWT access token (15 min) + refresh token (30 days) pair | Must |
| AUTH-05 | Refresh token blacklist on logout (stored in PostgreSQL) | Must |
| AUTH-06 | Password reset via email link (SHA-256 hashed token, 1hr expiry) | Must |
| AUTH-07 | Role system: student / creator / moderator / admin | Must |
| AUTH-08 | Account status: active / banned / suspended | Must |
| AUTH-09 | Auto-generate unique referral code (8-char alphanumeric) on signup | Must |
| AUTH-10 | Unique wallet ID auto-generated on signup (SMZ-YYYY-XXXX format) | Must |
| AUTH-11 | Login streak tracked on every successful login | Must |

---

## 3.2 Student Onboarding & Exam Profile

| Ref | Requirement | Priority |
|---|---|---|
| PROF-01 | 4-step onboarding: account → exam type → department → subjects | Must |
| PROF-02 | Exam types supported: JAMB, WAEC, NECO, GCE, Post UTME | Must |
| PROF-03 | GCE = General Certificate Examination (Nov/Dec sitting) | Must |
| PROF-04 | JAMB/Post UTME: choose 4 subjects total; English Language compulsory | Must |
| PROF-05 | WAEC/NECO/GCE: choose 9 subjects total; English + Mathematics compulsory | Must |
| PROF-06 | Departments: Science, Arts, Commercial, Social Science, Technical, Vocational | Must |
| PROF-07 | Subject choices generate a SHA-256 fingerprint stored on user profile | Must |
| PROF-08 | Subject fingerprint used for all competition matching and leaderboard scoping | Must |
| PROF-09 | Students cannot access content outside their chosen subjects | Must |
| PROF-10 | Admin can update a student's exam profile with full recalculation of fingerprint | Should |
| PROF-11 | +50 XP bonus awarded on onboarding completion | Should |

---

## 3.3 Content & Subscription System

| Ref | Requirement | Priority |
|---|---|---|
| CONT-01 | Three pricing types per lesson: free / platform / creator_paid | Must |
| CONT-02 | Free lessons: accessible to all verified users | Must |
| CONT-03 | Platform lessons: gated by active student subscription | Must |
| CONT-04 | Creator-paid lessons/textbooks: always separate from subscriptions | Must |
| CONT-05 | Student plans: Basic (₦1,000 — 1 subject), Standard (₦3,000 — all subjects), Premium (₦5,000 — all + PDFs + live classes) | Must |
| CONT-06 | Subscriptions never unlock creator-paid content — two systems run in parallel | Must |
| CONT-07 | Lesson video progress tracked per user (watched seconds, completed flag) | Must |
| CONT-08 | Resume watching from where user left off | Should |
| CONT-09 | Free videos served via YouTube embeds; premium via Vimeo domain-restricted links | Must |
| CONT-10 | Admin reviews and approves all creator-uploaded content before it goes live (within 24h) | Must |
| CONT-11 | Creator textbooks/PDFs stored on AWS S3; access-gated until purchased | Must |
| CONT-12 | Past questions organised by year, subject, exam type with explanations | Must |

---

## 3.4 CBT Mock Exam Simulator

| Ref | Requirement | Priority |
|---|---|---|
| CBT-01 | 4-subject tabs matching real JAMB UTME format (English, Maths, Physics, Chemistry) | Must |
| CBT-02 | Live countdown timer; turns red and pulses under 5 minutes | Must |
| CBT-03 | Question navigator palette (numbered grid) with answered/flagged/unanswered states | Must |
| CBT-04 | Flag-for-review checkbox per question | Must |
| CBT-05 | Submit with confirmation warning if unanswered questions remain | Must |
| CBT-06 | Results screen: animated score ring, subject breakdown, answer review with explanations | Must |
| CBT-07 | Results screen: itemised points earned (completion, score %, streak bonus) | Must |
| CBT-08 | Questions drawn only from student's chosen subjects | Must |
| CBT-09 | Study insights on results screen identifying weak subjects and time management issues | Should |
| CBT-10 | Share result to WhatsApp, Telegram, X, Facebook | Should |

---

## 3.5 Gamification Engine

| Ref | Requirement | Priority |
|---|---|---|
| GAME-01 | Daily earning cap: 200 XP/day (redemptions bypass cap) | Must |
| GAME-02 | Daily login: +10 base + 2 per streak day (max +20 streak bonus) | Must |
| GAME-03 | Quiz complete: up to 50 XP based on score %; +20 bonus for 100% | Must |
| GAME-04 | Video 50% watched: +5 XP; video completed: +10 XP (each once per lesson) | Must |
| GAME-05 | Forum post/reply: +8 XP; accepted answer: +25 XP | Must |
| GAME-06 | Content share: +5 XP (max 3/day) | Must |
| GAME-07 | Daily challenge: +30 XP (once per calendar day) | Must |
| GAME-08 | Referral signup: +100 XP; referral goes premium: +500 XP | Must |
| GAME-09 | 10 XP levels with defined thresholds (200 → 500 → 1,000 → ... → 15,000) | Must |
| GAME-10 | 17 badges auto-awarded on criteria (streaks, quiz counts, perfect scores, referrals, etc.) | Must |
| GAME-11 | Leaderboard scoped by subject fingerprint (students only compete within peer group) | Must |
| GAME-12 | Leaderboard periods: daily / weekly / all-time | Must |
| GAME-13 | Reward store: airtime, data, cash, gift cards, subscription upgrades | Must |
| GAME-14 | Redemptions deducted from XP immediately; fulfilled within 24h by admin | Must |

---

## 3.6 Quiz Battle System

| Ref | Requirement | Priority |
|---|---|---|
| BATT-01 | Quick Battle: 10 questions, 5-minute timer, matched instantly | Must |
| BATT-02 | Weekly Challenge: 30 questions across all 5 chosen subjects, 45-minute timer | Must |
| BATT-03 | Async Challenge: send battle link to specific friend | Should |
| BATT-04 | Matching uses subject fingerprint — only students with identical exam type + subjects are matched | Must |
| BATT-05 | Live opponent progress tracker (question-by-question status) | Must |
| BATT-06 | Forfeit option available during battle | Must |
| BATT-07 | Weekly Challenge: 1 attempt per student per week; score is final | Must |
| BATT-08 | Weekly Challenge scoring: +3 correct, −1 wrong, 0 skip; tiebreak by completion time | Must |
| BATT-09 | Weekly Challenge prizes: 1st ₦10,000 + 500 pts, 2nd ₦5,000 airtime + 300 pts, 3rd ₦2,000 data + 150 pts | Must |
| BATT-10 | Prizes credited to winners' wallets on Monday morning after admin verification | Must |
| BATT-11 | Battle results screen: score comparison, question breakdown, points earned breakdown, leaderboard shift | Must |

---

## 3.7 Creator Marketplace

| Ref | Requirement | Priority |
|---|---|---|
| CREA-01 | Three creator tiers: Silver (₦5,000/mo, 60%), Gold (₦10,000/mo, 70%), Platinum (₦20,000/mo, 80%) | Must |
| CREA-02 | Creator subscription required before any content can be published or sold | Must |
| CREA-03 | If subscription lapses: existing purchases stay live for buyers; new sales/uploads blocked | Must |
| CREA-04 | Gold and Platinum creators get featured placement (visible before Silver in search/browse) | Must |
| CREA-05 | Platinum creators can be assigned as class/forum moderators by admin | Must |
| CREA-06 | Creators can sell: original video lessons and original textbooks/PDFs | Must |
| CREA-07 | All creator content reviewed and approved by admin before going live (within 24h) | Must |
| CREA-08 | Revenue split (60/70/80%) credited to creator wallet immediately on each sale | Must |
| CREA-09 | Creator earnings dashboard: total earnings, available balance, sales per content item | Must |
| CREA-10 | Minimum payout request: ₦5,000; processed every Friday | Must |

---

## 3.8 Wallet System

| Ref | Requirement | Priority |
|---|---|---|
| WALL-01 | Every user has a wallet with an available balance | Must |
| WALL-02 | Wallet can be funded via Paystack, Flutterwave, or Stripe | Must |
| WALL-03 | Peer-to-peer transfers: send money to any SchoolMattazz user by wallet ID or username | Must |
| WALL-04 | Transfers require 4-digit wallet PIN; bcrypt-hashed, set by user | Must |
| WALL-05 | Daily P2P transfer limit: ₦100,000 | Must |
| WALL-06 | Bank withdrawal minimum: ₦1,000; requires PIN + admin approval | Must |
| WALL-07 | Admin approves withdrawal → triggers Paystack Transfer API → bank within 24h | Must |
| WALL-08 | Payout flow: all payouts (rewards, creator earnings, referral bonuses) credit wallet first | Must |
| WALL-09 | Users then withdraw from wallet to bank at their convenience | Must |
| WALL-10 | Full wallet ledger: every debit/credit logged with balance snapshot, category, reference | Must |
| WALL-11 | Transaction categories: fund / transfer_in / transfer_out / withdrawal / payout / refund | Must |
| WALL-12 | If bank transfer fails: debit reversed automatically, balance restored | Must |
| WALL-13 | Admin wallet panel: payout queue, withdrawal queue, P2P monitor, fraud flags | Must |

---

## 3.9 Referral & Anti-Fraud System

| Ref | Requirement | Priority |
|---|---|---|
| REF-01 | Every user has a unique referral code auto-generated at signup | Must |
| REF-02 | Referrer earns +100 XP when referred user completes phone verification | Must |
| REF-03 | Referrer earns +500 XP when referred user upgrades to any paid plan | Must |
| REF-04 | Anti-fraud: flag if same IP used for >3 referrals in 24 hours | Must |
| REF-05 | Anti-fraud: flag if same device fingerprint used for multiple accounts | Must |
| REF-06 | Flagged referrals: pending status, no XP awarded until admin clears | Must |
| REF-07 | Admin fraud panel shows flagged referrals, duplicate devices, daily cap hits, bans | Must |
| REF-08 | Referral leaderboard: top referrers ranked by confirmed signups | Should |

---

## 3.10 Community (Forums & Study Groups)

| Ref | Requirement | Priority |
|---|---|---|
| COMM-01 | Study groups: public and private, linked to subject/exam type | Must |
| COMM-02 | Forum threads with upvotes, replies, pinned and solved tags | Must |
| COMM-03 | Nested replies (parent-child) supported | Should |
| COMM-04 | Accepted answer marking by thread author (+25 XP to reply author) | Must |
| COMM-05 | Upvote rewards: +3 XP per upvote received (max 15 XP/day from upvotes) | Must |
| COMM-06 | Platinum creators can be assigned as group moderators by admin | Must |
| COMM-07 | Content moderation: admins and assigned moderators can lock threads, remove posts | Must |

---

## 3.11 Social Media Integration

| Ref | Requirement | Priority |
|---|---|---|
| SOC-01 | Dedicated "Our Channels" page within the platform | Must |
| SOC-02 | Links to all 5 official SchoolMattazz channels: YouTube, Facebook, X, WhatsApp Channel, Telegram | Must |
| SOC-03 | Share results (quiz score, battle result, weekly challenge rank) to any social platform | Must |
| SOC-04 | WhatsApp and Telegram share use native pre-filled message links | Must |
| SOC-05 | Footer and dashboard show social media links persistently | Must |
| SOC-06 | YouTube latest video embedded on homepage | Must |

---

## 3.12 Admin Panel

| Ref | Requirement | Priority |
|---|---|---|
| ADMN-01 | User management: list, search, ban/suspend/activate any account | Must |
| ADMN-02 | Content review queue: approve/reject creator videos and textbooks | Must |
| ADMN-03 | Payout queue: approve reward payouts and creator earnings (credits wallet) | Must |
| ADMN-04 | Withdrawal approvals: trigger Paystack Transfer API for bank payments | Must |
| ADMN-05 | Fraud detection panel: flagged referrals, velocity flags, large transfer alerts | Must |
| ADMN-06 | Analytics: total users, active subscriptions, MTD revenue, pending payouts | Must |
| ADMN-07 | Creator management: verify/reject creator applications, view tier status | Must |
| ADMN-08 | Reward rules: configurable point values per action | Should |
| ADMN-09 | Send push notifications or announcements to all users or segments | Should |
| ADMN-10 | Weekly challenge management: create, publish, review entries, approve prizes | Must |

---

# PART 4 — MINIMUM VIABLE PRODUCT (MVP)

## 4.1 What the MVP Is

The MVP is the smallest, fastest-to-build version of SchoolMattazz that:
- Delivers real value to students preparing for JAMB and WAEC
- Generates revenue from subscriptions
- Proves the referral and gamification loop works
- Can be handed to 100–500 beta users for feedback within **8 weeks of development start**

The MVP deliberately excludes the creator marketplace, weekly challenge prize payouts, peer-to-peer wallet transfers, and the quiz battle system — these are Phase 2 features that require the core platform to be validated first.

---

## 4.2 MVP Feature List

### ✅ INCLUDED IN MVP

| # | Feature | Why it's in MVP |
|---|---|---|
| 1 | Email + Google OAuth signup/login | Core access |
| 2 | SMS OTP verification (Termii) | Anti-fraud + trust |
| 3 | Student onboarding: exam type → department → subjects | Defines the entire learning path |
| 4 | Subject-gated content access | Core value proposition |
| 5 | Past questions (JAMB 2018–2025 + WAEC 2018–2025) | Primary reason students come |
| 6 | Basic quiz system (take quiz, see score, see explanations) | Core study loop |
| 7 | Daily quiz challenge (+30 XP) | Retention hook |
| 8 | CBT mock exam simulator (JAMB-style) | Key differentiator |
| 9 | CBT results screen with subject breakdown | Study feedback |
| 10 | Student dashboard (streak, progress, points) | Engagement |
| 11 | Basic gamification: XP, login streak, level, 5 core badges | Motivation |
| 12 | Student subscription plans: Basic / Standard / Premium | Revenue |
| 13 | Paystack integration (NGN payments only) | Revenue |
| 14 | Referral system with XP rewards | Growth |
| 15 | Basic leaderboard (weekly, subject-scoped) | Competition |
| 16 | Wallet: fund + bank withdrawal (no P2P yet) | Trust + rewards |
| 17 | Reward redemption: airtime and data only | Early reward loop |
| 18 | Admin panel: users, content, payout approvals, analytics | Operations |
| 19 | Social media links (YouTube, WhatsApp, Telegram, Facebook, X) | Distribution |
| 20 | Homepage with SEO | Discovery |

---

### ❌ EXCLUDED FROM MVP (Phase 2+)

| Feature | Reason deferred |
|---|---|
| Creator marketplace (upload, sell, tiers) | Complex multi-sided marketplace; needs student base first |
| Quiz battle system (live P2P) | Needs WebSockets + sufficient concurrent users to match |
| Weekly challenge with cash prizes | Needs admin capacity and fraud guardrails matured |
| P2P wallet transfers | Regulatory risk; needs user trust established first |
| Study groups & forums | Nice-to-have; students must first find the core value |
| Flutterwave + Stripe integration | Paystack covers 95%+ of Nigerian users at launch |
| Full badge set (17 badges) | Start with 5 core badges; expand with engagement data |
| Vimeo premium video hosting | Expensive; use YouTube embeds for all video at MVP |
| Post UTME / GCE exam types | Start with JAMB + WAEC; highest demand pair |
| AI study assistant | Phase 3 feature |
| Live classes | Requires scheduling infrastructure |
| Offline mode | Phase 2 mobile app feature |

---

## 4.3 MVP 8-Week Build Plan

| Week | Focus | Deliverable |
|---|---|---|
| **1** | Infrastructure | PostgreSQL + Redis live; schema migrated; seed data loaded |
| **2** | Auth | Signup, login, Google OAuth, OTP, JWT working end-to-end |
| **3** | Onboarding + content | Exam profile flow; subject-gated lesson/quiz access |
| **4** | Quiz + CBT | Past questions loaded; quiz submission + scoring; CBT simulator |
| **5** | Gamification + dashboard | XP, streaks, 5 badges, leaderboard, student dashboard |
| **6** | Payments + wallet | Paystack subscriptions + webhook; wallet fund + withdrawal |
| **7** | Admin + referrals | Admin panel; referral tracking; payout approvals |
| **8** | Polish + launch | Homepage; social links; SEO; beta user onboarding (100 students) |

---

## 4.4 MVP Success Criteria

After 60 days of MVP operation, the following numbers indicate product-market fit and justify Phase 2 build:

| Metric | Target |
|---|---|
| Registered students | 5,000+ |
| Paid subscribers | 500+ (10% conversion) |
| Daily active users | 1,500+ (30% DAU/MAU) |
| Average login streak | 5+ days |
| Quiz completion rate | >65% |
| Referral-driven signups | >30% of new users |
| Wallet transactions | ₦2M+ cumulative |
| NPS score | >50 |
| Churn (monthly) | <15% |

If these are met at MVP, Phase 2 (creator marketplace + quiz battles + weekly challenge) is immediately justified and fundable.

---

## 4.5 MVP Tech Stack (Simplified)

| Layer | MVP Choice | Reason |
|---|---|---|
| Frontend | Next.js + Tailwind (Vercel) | Fast deploy, free tier covers MVP traffic |
| Backend | Node.js + Express (Railway) | Instant deploy, auto-scaling, ₦0 start |
| Database | PostgreSQL (Railway plugin) | Managed, no DevOps needed |
| Cache | Redis (Railway plugin) | Leaderboard + rate limiting |
| Auth | JWT + Firebase (Google OAuth) | Already built |
| SMS | Termii | Nigerian numbers, cheapest rate |
| Email | Zoho SMTP (free) | 10,000 emails/month free |
| Payments | Paystack only | 95%+ Nigerian coverage |
| Video | YouTube embeds only | Free, no hosting cost |
| Files | Skip (no creator content yet) | S3 added in Phase 2 |

**Estimated monthly infrastructure cost at MVP:** ₦35,000–₦60,000 ($25–$45)

---

## 4.6 Phase Roadmap

```
PHASE 1 — MVP (Weeks 1–8)
  Core: Auth · Onboarding · Past Questions · CBT · Basic Gamification
  Revenue: Paystack subscriptions · Wallet · Airtime/data redemption
  Growth: Referrals · Leaderboard · Social media channels

PHASE 2 — Growth (Months 3–6)
  Compete: Quiz battles · Weekly challenge with prizes
  Community: Study groups · Forums
  Wallet: P2P transfers · Flutterwave + Stripe
  Creators: Silver/Gold/Platinum marketplace

PHASE 3 — Scale (Months 7–12)
  AI: Study assistant · Personalised question recommendations
  Mobile: iOS + Android native apps (offline mode)
  International: Ghana · Kenya expansion
  Live classes: Scheduled sessions with top creators
  API: Open platform for schools and tutorial centres
```

---

*Document prepared by Claude (Anthropic) · SchoolMattazz Build Session · June 2026*
*All product decisions, business rules, and technical specifications reflect the full build completed across this session.*
