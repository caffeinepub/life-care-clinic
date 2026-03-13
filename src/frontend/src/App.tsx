import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitAppointment } from "@/hooks/useQueries";
import {
  Activity,
  AlertCircle,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Droplets,
  FileText,
  FlaskConical,
  Heart,
  MapPin,
  Menu,
  Microscope,
  Phone,
  Pill,
  Shield,
  Stethoscope,
  Sun,
  Sunset,
  Thermometer,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const services = [
  {
    icon: Activity,
    title: "BP Check",
    desc: "Accurate blood pressure monitoring and assessment",
  },
  {
    icon: Droplets,
    title: "SPO2 Check",
    desc: "Oxygen saturation level measurement",
  },
  {
    icon: Heart,
    title: "PR Check",
    desc: "Pulse rate measurement and cardiac rhythm evaluation",
  },
  {
    icon: Thermometer,
    title: "Temperature Check",
    desc: "Body temperature assessment and fever detection",
  },
  {
    icon: FlaskConical,
    title: "RBS Test",
    desc: "Random blood sugar testing for diabetes management",
  },
  {
    icon: Microscope,
    title: "AVI Test",
    desc: "Comprehensive AVI diagnostic testing",
  },
  {
    icon: FileText,
    title: "Medicine Prescription",
    desc: "Expert pharmaceutical prescriptions and guidance",
  },
  {
    icon: Stethoscope,
    title: "Medical Investigation",
    desc: "Thorough clinical examination and diagnosis",
  },
];

const medicineCategories = [
  {
    category: "Fever & Pain Relief",
    color: "oklch(0.92 0.06 30)",
    textColor: "oklch(0.45 0.14 30)",
    medicines: [
      "Paracetamol (Crocin, Dolo-650)",
      "Ibuprofen (Brufen, Combiflam)",
      "Diclofenac Sodium",
      "Nimesulide",
      "Aspirin",
    ],
  },
  {
    category: "Antibiotic & Infection",
    color: "oklch(0.92 0.06 150)",
    textColor: "oklch(0.38 0.12 150)",
    medicines: [
      "Amoxicillin",
      "Azithromycin",
      "Ciprofloxacin",
      "Metronidazole",
      "Doxycycline",
      "Cefixime",
    ],
  },
  {
    category: "Gastric & Digestive",
    color: "oklch(0.92 0.05 240)",
    textColor: "oklch(0.40 0.12 240)",
    medicines: [
      "Pantoprazole / Omeprazole",
      "Domperidone (Vomistop)",
      "Ondansetron (Emeset)",
      "ORS (Electral Powder)",
      "Norfloxacin + Metronidazole",
      "Syrup Lactulose",
    ],
  },
  {
    category: "Cough, Cold & Allergy",
    color: "oklch(0.92 0.06 280)",
    textColor: "oklch(0.42 0.12 280)",
    medicines: [
      "Cetirizine / Loratadine",
      "Ambroxol + Guaifenesin Syrup",
      "Salbutamol",
      "Montelukast",
      "Chlorpheniramine Maleate",
    ],
  },
  {
    category: "Diabetes & Blood Sugar",
    color: "oklch(0.92 0.05 50)",
    textColor: "oklch(0.45 0.13 50)",
    medicines: [
      "Metformin",
      "Glimepiride",
      "Glibenclamide",
      "Voglibose",
      "Insulin (as prescribed)",
    ],
  },
  {
    category: "Blood Pressure & Heart",
    color: "oklch(0.92 0.06 10)",
    textColor: "oklch(0.45 0.14 10)",
    medicines: [
      "Amlodipine",
      "Losartan / Telmisartan",
      "Atenolol",
      "Enalapril",
      "Hydrochlorothiazide",
    ],
  },
  {
    category: "Vitamins & Supplements",
    color: "oklch(0.92 0.04 195)",
    textColor: "oklch(0.40 0.1 210)",
    medicines: [
      "Vitamin D3 (Calcirol)",
      "Vitamin B12 (Methylcobalamin)",
      "Iron + Folic Acid",
      "Calcium + Vitamin D",
      "Multivitamin",
      "Zinc Tablets",
    ],
  },
  {
    category: "Skin & Topical",
    color: "oklch(0.92 0.04 120)",
    textColor: "oklch(0.40 0.1 130)",
    medicines: [
      "Betamethasone Cream",
      "Clotrimazole Cream",
      "Mupirocin Ointment",
      "Calamine Lotion",
      "Hydrocortisone Cream",
    ],
  },
];

const investigationCategories = [
  {
    category: "Blood Tests",
    icon: FlaskConical,
    color: "oklch(0.92 0.06 10)",
    textColor: "oklch(0.45 0.14 10)",
    tests: [
      "CBC (Complete Blood Count)",
      "RBS / FBS / PPBS (Blood Sugar)",
      "HbA1c (Glycated Hemoglobin)",
      "Lipid Profile (Cholesterol)",
      "LFT (Liver Function Test)",
      "KFT (Kidney Function Test)",
      "Uric Acid",
      "ESR (Erythrocyte Sedimentation Rate)",
    ],
  },
  {
    category: "Urine & Stool Tests",
    icon: Microscope,
    color: "oklch(0.92 0.06 60)",
    textColor: "oklch(0.45 0.14 60)",
    tests: [
      "Urine Routine & Microscopy",
      "Urine Culture & Sensitivity",
      "Stool Routine Examination",
      "Occult Blood in Stool",
      "Pregnancy Test (Urine hCG)",
    ],
  },
  {
    category: "Thyroid & Hormones",
    icon: Activity,
    color: "oklch(0.92 0.06 150)",
    textColor: "oklch(0.38 0.12 150)",
    tests: [
      "TSH (Thyroid Stimulating Hormone)",
      "T3 / T4",
      "Free T3 / Free T4",
      "Serum Insulin",
      "Cortisol",
    ],
  },
  {
    category: "Cardiac & Imaging",
    icon: Heart,
    color: "oklch(0.92 0.06 280)",
    textColor: "oklch(0.42 0.12 280)",
    tests: [
      "ECG (Electrocardiogram)",
      "Chest X-Ray",
      "Abdominal Ultrasound",
      "Echo (Echocardiogram) – Referral",
      "CT Scan – Referral",
      "MRI – Referral",
    ],
  },
  {
    category: "Infection & Serology",
    icon: Shield,
    color: "oklch(0.92 0.05 240)",
    textColor: "oklch(0.40 0.12 240)",
    tests: [
      "Malaria Antigen Test",
      "Dengue NS1 / IgM / IgG",
      "Typhoid (Widal Test)",
      "HIV 1 & 2",
      "HBsAg (Hepatitis B)",
      "Anti-HCV (Hepatitis C)",
      "COVID Antigen / RTPCR",
    ],
  },
  {
    category: "Special Tests",
    icon: FileText,
    color: "oklch(0.92 0.04 100)",
    textColor: "oklch(0.40 0.1 110)",
    tests: [
      "Vitamin D (25-OH)",
      "Vitamin B12",
      "Serum Ferritin / Iron",
      "CRP (C-Reactive Protein)",
      "ANA / RA Factor",
      "Blood Group & Rh Typing",
    ],
  },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({
    patientName: "",
    phoneNumber: "",
    preferredDate: "",
    preferredTime: "",
    reasonForVisit: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const submitMutation = useSubmitAppointment();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.patientName ||
      !form.phoneNumber ||
      !form.preferredDate ||
      !form.preferredTime ||
      !form.reasonForVisit
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitMutation.mutateAsync(form);
      setFormStatus("success");
      setForm({
        patientName: "",
        phoneNumber: "",
        preferredDate: "",
        preferredTime: "",
        reasonForVisit: "",
      });
      toast.success("Appointment request submitted successfully!");
    } catch {
      setFormStatus("error");
      toast.error("Failed to submit appointment. Please try again.");
    }
  };

  const navLinks = [
    { label: "Home", id: "home", ocid: "nav.home_link" },
    { label: "About", id: "about", ocid: "nav.about_link" },
    { label: "Services", id: "services", ocid: "nav.services_link" },
    { label: "Medicines", id: "medicines", ocid: "nav.medicines_link" },
    {
      label: "Investigations",
      id: "investigations",
      ocid: "nav.investigations_link",
    },
    { label: "Timing", id: "timing", ocid: "nav.timing_link" },
    { label: "Contact", id: "contact", ocid: "nav.contact_link" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-right" />

      {/* Sticky Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2.5 group"
            >
              <img
                src="/assets/uploads/Screenshot_20250816-141855_2-1.png"
                alt="Life Care Clinic Logo"
                className="w-10 h-10 object-contain"
              />
              <div className="leading-tight">
                <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">
                  LIFE CARE
                </p>
                <p className="text-sm font-bold text-foreground tracking-wider uppercase -mt-0.5">
                  CLINIC
                </p>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  data-ocid={link.ocid}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                data-ocid="nav.book_button"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-5"
                onClick={() => scrollTo("appointment")}
              >
                Book Appointment
              </Button>
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              data-ocid="nav.menu_toggle"
              className="lg:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={link.ocid}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-foreground hover:text-primary py-2 text-left transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              data-ocid="nav.book_button"
              className="bg-primary text-primary-foreground font-semibold mt-1"
              onClick={() => scrollTo("appointment")}
            >
              Book Appointment
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        data-ocid="hero.section"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.25 0.08 220) 0%, oklch(0.35 0.12 205) 50%, oklch(0.45 0.14 195) 100%)",
        }}
      >
        <div
          className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "oklch(0.7 0.1 195)" }}
        />
        <div
          className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: "oklch(0.65 0.12 210)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm font-medium">
                Trusted Healthcare Provider
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/assets/uploads/Screenshot_20250816-141855_2-1.png"
                alt="Life Care Clinic"
                className="w-20 h-20 object-contain drop-shadow-lg"
              />
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
                Life Care Clinic
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-3">
              Dr. Syed Saqib Ali
            </p>
            <p className="text-base md:text-lg text-white/70 max-w-xl mb-8 leading-relaxed">
              Compassionate, quality healthcare for every patient. Experience
              professional medical services with a personal touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold text-base px-8"
                onClick={() => scrollTo("appointment")}
              >
                Book Appointment <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-semibold text-base px-8"
                onClick={() => scrollTo("services")}
              >
                Our Services
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
              <div>
                <p className="text-2xl font-bold text-white">8+</p>
                <p className="text-white/60 text-sm">Services</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Mon–Sat</p>
                <p className="text-white/60 text-sm">Open Days</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">10AM–9:30PM</p>
                <p className="text-white/60 text-sm">Working Hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Doctor Section */}
      <section id="about" data-ocid="about.section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-2xl translate-x-3 translate-y-3"
                  style={{ background: "oklch(0.88 0.04 210)" }}
                />
                <div
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl shadow-card flex items-center justify-center"
                  style={{ background: "oklch(0.93 0.04 210)" }}
                >
                  <img
                    src="/assets/uploads/Screenshot_20250816-141855_2-1.png"
                    alt="Life Care Clinic"
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow-card">
                  <p className="text-xs font-medium opacity-80">
                    General Physician
                  </p>
                  <p className="text-sm font-bold">MBBS, MD</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                About The Doctor
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                Dr. Syed Saqib Ali
              </h2>
              <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                General Physician & Primary Care Specialist at Life Care Clinic,
                Kooza Sironj
              </p>
              <p className="text-foreground text-base mb-4 leading-relaxed">
                Dr. Syed Saqib Ali is a highly experienced and dedicated general
                physician committed to providing comprehensive primary
                healthcare to patients of all ages. With extensive training and
                years of clinical practice, he brings a patient-centered
                approach to every consultation.
              </p>
              <p className="text-foreground text-base mb-8 leading-relaxed">
                He specializes in preventive care, chronic disease management,
                and routine diagnostics. His clinic at Kooza Sironj has become a
                trusted healthcare destination for families in the region.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Award, text: "MBBS Qualified Physician" },
                  { icon: Shield, text: "Licensed Medical Practitioner" },
                  { icon: Heart, text: "Patient-Centered Care" },
                  { icon: Stethoscope, text: "Primary Care Expert" },
                ].map((cred) => (
                  <div key={cred.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <cred.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {cred.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        data-ocid="services.section"
        className="py-20"
        style={{ background: "oklch(0.97 0.01 210)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              What We Offer
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Our Medical Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Comprehensive diagnostic and primary care services delivered with
              precision and care.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <div
                key={service.title}
                data-ocid={`services.item.${i + 1}`}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-foreground text-base mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medicine Prescription Section */}
      <section
        id="medicines"
        data-ocid="medicines.section"
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Pharmacy & Treatment
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Medicine Prescriptions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Dr. Syed Saqib Ali prescribes evidence-based medicines for common
              and chronic conditions. Below are commonly prescribed medication
              categories at Life Care Clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {medicineCategories.map((cat, i) => (
              <div
                key={cat.category}
                data-ocid={`medicines.item.${i + 1}`}
                className="rounded-xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div
                  className="px-5 py-3 flex items-center gap-2"
                  style={{ background: cat.color }}
                >
                  <Pill className="w-4 h-4" style={{ color: cat.textColor }} />
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: cat.textColor }}
                  >
                    {cat.category}
                  </h3>
                </div>
                <ul className="px-5 py-4 space-y-2">
                  {cat.medicines.map((med) => (
                    <li
                      key={med}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{med}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl border border-amber-200 bg-amber-50 text-center max-w-2xl mx-auto">
            <p className="text-amber-800 text-sm font-medium">
              ⚠️ All medicines are prescribed only after consultation. Do not
              self-medicate. Visit the clinic for proper diagnosis and
              prescription.
            </p>
          </div>
        </div>
      </section>

      {/* Medical Investigation Section */}
      <section
        id="investigations"
        data-ocid="investigations.section"
        className="py-20"
        style={{ background: "oklch(0.97 0.01 210)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Diagnostics & Pathology
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Medical Investigations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              We recommend and guide patients for the necessary diagnostic
              tests. Below are the investigations commonly advised at Life Care
              Clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {investigationCategories.map((cat, i) => (
              <div
                key={cat.category}
                data-ocid={`investigations.item.${i + 1}`}
                className="bg-white rounded-xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div
                  className="px-5 py-3 flex items-center gap-2"
                  style={{ background: cat.color }}
                >
                  <cat.icon
                    className="w-4 h-4"
                    style={{ color: cat.textColor }}
                  />
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: cat.textColor }}
                  >
                    {cat.category}
                  </h3>
                </div>
                <ul className="px-5 py-4 space-y-2">
                  {cat.tests.map((test) => (
                    <li
                      key={test}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <Microscope className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl border border-blue-200 bg-blue-50 text-center max-w-2xl mx-auto">
            <p className="text-blue-800 text-sm font-medium">
              🔬 Investigations are advised based on clinical assessment.
              Patients are referred to certified labs for sample collection and
              reports.
            </p>
          </div>
        </div>
      </section>

      {/* Clinic Timing Section */}
      <section
        id="timing"
        data-ocid="timing.section"
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              When To Visit
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Clinic Hours
            </h2>
            <p className="text-muted-foreground text-base">
              We are open Monday to Saturday for your convenience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div
              data-ocid="timing.morning_card"
              className="rounded-2xl p-8 border border-border shadow-card"
              style={{ background: "oklch(0.97 0.015 55)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.9 0.08 65)" }}
                >
                  <Sun
                    className="w-6 h-6"
                    style={{ color: "oklch(0.65 0.15 60)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "oklch(0.6 0.1 60)" }}
                  >
                    Morning
                  </p>
                  <p className="font-semibold text-foreground text-lg">
                    Morning Hours
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground font-bold text-xl">
                    10:00 AM – 12:00 PM
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-4 h-4"
                    style={{ color: "oklch(0.55 0.15 150)" }}
                  />
                  <span className="text-muted-foreground text-sm">
                    Monday – Saturday
                  </span>
                </div>
              </div>
            </div>

            <div
              data-ocid="timing.evening_card"
              className="rounded-2xl p-8 border border-border shadow-card"
              style={{ background: "oklch(0.97 0.015 240)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.88 0.06 240)" }}
                >
                  <Sunset
                    className="w-6 h-6"
                    style={{ color: "oklch(0.45 0.13 230)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "oklch(0.45 0.1 230)" }}
                  >
                    Afternoon / Evening
                  </p>
                  <p className="font-semibold text-foreground text-lg">
                    Evening Hours
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground font-bold text-xl">
                    2:00 PM – 9:30 PM
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-4 h-4"
                    style={{ color: "oklch(0.55 0.15 150)" }}
                  />
                  <span className="text-muted-foreground text-sm">
                    Monday – Saturday
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-muted-foreground text-sm mt-6">
            * Closed on Sundays and public holidays
          </p>
        </div>
      </section>

      {/* Appointment Form Section */}
      <section
        id="appointment"
        data-ocid="appointment.section"
        className="py-20"
        style={{ background: "oklch(0.97 0.01 210)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                Schedule a Visit
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Book an Appointment
              </h2>
              <p className="text-muted-foreground text-base">
                Fill in the form below and we will confirm your appointment.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-card">
              {formStatus === "success" ? (
                <div
                  data-ocid="appointment.success_state"
                  className="text-center py-8"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "oklch(0.92 0.06 150)" }}
                  >
                    <CheckCircle2
                      className="w-8 h-8"
                      style={{ color: "oklch(0.45 0.15 150)" }}
                    />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-2">
                    Appointment Requested!
                  </h3>
                  <p className="text-muted-foreground text-base mb-6">
                    Thank you! We will contact you shortly to confirm your
                    appointment.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFormStatus("idle")}
                    className="border-primary text-primary hover:bg-secondary"
                  >
                    Book Another Appointment
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formStatus === "error" && (
                    <div
                      data-ocid="appointment.error_state"
                      className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20"
                    >
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                      <p className="text-destructive text-sm">
                        Something went wrong. Please try again or call us
                        directly.
                      </p>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="patientName"
                        className="text-sm font-medium"
                      >
                        Patient Name
                      </Label>
                      <Input
                        id="patientName"
                        data-ocid="appointment.input"
                        placeholder="Full name"
                        value={form.patientName}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            patientName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="phoneNumber"
                        className="text-sm font-medium"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phoneNumber"
                        data-ocid="appointment.phone_input"
                        placeholder="Your mobile number"
                        type="tel"
                        value={form.phoneNumber}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            phoneNumber: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="preferredDate"
                        className="text-sm font-medium"
                      >
                        Preferred Date
                      </Label>
                      <Input
                        id="preferredDate"
                        data-ocid="appointment.date_input"
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            preferredDate: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="preferredTime"
                        className="text-sm font-medium"
                      >
                        Preferred Time
                      </Label>
                      <Select
                        value={form.preferredTime}
                        onValueChange={(v) =>
                          setForm((p) => ({ ...p, preferredTime: v }))
                        }
                      >
                        <SelectTrigger
                          id="preferredTime"
                          data-ocid="appointment.select"
                        >
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">
                            Morning (10:00 AM – 12:00 PM)
                          </SelectItem>
                          <SelectItem value="afternoon">
                            Afternoon (2:00 PM – 5:00 PM)
                          </SelectItem>
                          <SelectItem value="evening">
                            Evening (5:00 PM – 9:30 PM)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="reasonForVisit"
                      className="text-sm font-medium"
                    >
                      Reason for Visit
                    </Label>
                    <Textarea
                      id="reasonForVisit"
                      data-ocid="appointment.textarea"
                      placeholder="Briefly describe your symptoms or reason for visit"
                      rows={4}
                      value={form.reasonForVisit}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          reasonForVisit: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    data-ocid="appointment.submit_button"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base h-12"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Request Appointment"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer Section */}
      <footer
        id="contact"
        data-ocid="contact.section"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.07 225) 0%, oklch(0.28 0.1 210) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="/assets/uploads/Screenshot_20250816-141855_2-1.png"
                  alt="Life Care Clinic"
                  className="w-10 h-10 object-contain"
                />
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-white/60 tracking-widest uppercase">
                    LIFE CARE
                  </p>
                  <p className="text-sm font-bold text-white tracking-wider uppercase -mt-0.5">
                    CLINIC
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Providing quality healthcare to our community with compassion
                and expertise.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white text-base mb-5">
                Contact Us
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:6268387875"
                  data-ocid="contact.phone_link"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">+91 6268387875</span>
                </a>
                <div className="flex items-start gap-3 text-white/70">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">
                    Kooza Sironj,
                    <br />
                    Madhya Pradesh, India
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white text-base mb-5">
                Clinic Hours
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Morning</span>
                  <span className="text-white text-sm font-medium">
                    10:00 AM – 12:00 PM
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">
                    Afternoon/Evening
                  </span>
                  <span className="text-white text-sm font-medium">
                    2:00 PM – 9:30 PM
                  </span>
                </div>
                <div
                  className="border-t pt-3 mt-3"
                  style={{ borderColor: "oklch(1 0 0 / 0.1)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Days</span>
                    <span className="text-white text-sm font-medium">
                      Mon – Sat
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/60 text-sm">Sunday</span>
                    <span className="text-red-300 text-sm font-medium">
                      Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="border-t mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderColor: "oklch(1 0 0 / 0.1)" }}
          >
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} Life Care Clinic. All rights
              reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/60 text-xs transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
