import { Link } from "react-router";
import type { Route } from "./+types/sponsor";
import {
  ArrowLeft,
  GithubIcon,
  Heart,
  Coffee,
  Sparkles,
  Star,
  Code2,
  ExternalLink,
  Rocket,
  Check,
  X,
  Minus,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { SiteNav } from "~/components/SiteNav";
import { SiteFooter } from "~/components/SiteFooter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sponsor - React PDF Highlighter Plus" },
    {
      name: "description",
      content: "Support the development of React PDF Highlighter Plus - an open source PDF annotation library for React.",
    },
  ];
}

const benefits = [
  {
    icon: Heart,
    title: "Support Open Source",
    description: "Help keep this project free and accessible to everyone in the developer community.",
  },
  {
    icon: Sparkles,
    title: "Enable New Features",
    description: "Your support helps fund the development of new features and improvements.",
  },
  {
    icon: Code2,
    title: "Maintain Quality",
    description: "Contributions help maintain code quality, fix bugs, and ensure compatibility with latest React versions.",
  },
  {
    icon: Star,
    title: "Priority Support",
    description: "Sponsors get priority responses on GitHub issues and feature requests.",
  },
];

interface ComparisonFeature {
  feature: string;
  reactPdfHighlighter: "yes" | "no" | "partial";
  pspdfkit: "yes" | "no" | "partial";
  pdftron: "yes" | "no" | "partial";
  pdfjs: "yes" | "no" | "partial";
}

const comparisonData: ComparisonFeature[] = [
  { feature: "Open Source", reactPdfHighlighter: "yes", pspdfkit: "no", pdftron: "no", pdfjs: "yes" },
  { feature: "Free to Use", reactPdfHighlighter: "yes", pspdfkit: "no", pdftron: "no", pdfjs: "yes" },
  { feature: "React Native Support", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "partial" },
  { feature: "Text Highlighting", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "no" },
  { feature: "Area Selection", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "no" },
  { feature: "Freehand Drawing", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "no" },
  { feature: "Shape Annotations", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "no" },
  { feature: "Sticky Notes", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "no" },
  { feature: "Image/Signature Embedding", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "no" },
  { feature: "PDF Export with Annotations", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "no" },
  { feature: "Dark Mode Support", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "partial" },
  { feature: "Document Outline", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "yes" },
  { feature: "Thumbnail Navigation", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "partial" },
  { feature: "TypeScript Support", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "yes" },
  { feature: "No License Key Required", reactPdfHighlighter: "yes", pspdfkit: "no", pdftron: "no", pdfjs: "yes" },
  { feature: "Commercial Use", reactPdfHighlighter: "yes", pspdfkit: "yes", pdftron: "yes", pdfjs: "yes" },
];

const vendors = [
  { key: "reactPdfHighlighter", name: "React PDF Highlighter Plus", highlight: true },
  { key: "pspdfkit", name: "PSPDFKit", highlight: false },
  { key: "pdftron", name: "Apryse (PDFTron)", highlight: false },
  { key: "pdfjs", name: "PDF.js", highlight: false },
];

function FeatureIcon({ value }: { value: "yes" | "no" | "partial" }) {
  if (value === "yes") {
    return <Check className="h-5 w-5 text-green-500" />;
  }
  if (value === "no") {
    return <X className="h-5 w-5 text-red-500" />;
  }
  return <Minus className="h-5 w-5 text-yellow-500" />;
}

export default function Sponsor() {
  return (
    <div className="dot-grid min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav
        links={[
          { label: "Docs", to: "/docs" },
          { label: "Changelog", to: "/changelog" },
        ]}
      />

      {/* Main Content */}
      <main className="px-4 pb-16 pt-12 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-pink-500/10">
              <Heart className="h-10 w-10 text-pink-500" />
            </div>
            <h1 className="mb-4 font-display text-[44px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              Support this project
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              react-pdf-highlighter-plus is free and open source. If you find it useful,
              consider supporting its development to help keep it maintained and improved.
            </p>

            {/* Main CTA */}
            <Button size="lg" className="text-lg px-8 py-6 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black" asChild>
              <a
                href="https://buymeacoffee.com/edwardha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <Coffee className="h-6 w-6" />
                Buy me a coffee
              </a>
            </Button>
          </div>

          {/* Benefits Grid */}
          <div className="mb-16">
            <h2 className="mb-8 text-center font-display text-2xl font-semibold">
              Why sponsor?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Comparison Section */}
          <div className="mb-16">
            <h2 className="mb-2 text-center font-display text-2xl font-semibold">
              How we compare
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              See how react-pdf-highlighter-plus stacks up against other PDF solutions
            </p>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      {vendors.map((vendor) => (
                        <th
                          key={vendor.key}
                          className={`text-center p-4 font-semibold min-w-[120px] ${
                            vendor.highlight ? "bg-primary/10" : ""
                          }`}
                        >
                          <span className={vendor.highlight ? "text-primary" : ""}>
                            {vendor.name}
                          </span>
                          {vendor.highlight && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              Ours
                            </Badge>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr
                        key={row.feature}
                        className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                      >
                        <td className="p-4 font-medium">{row.feature}</td>
                        {vendors.map((vendor) => (
                          <td
                            key={vendor.key}
                            className={`text-center p-4 ${
                              vendor.highlight ? "bg-primary/5" : ""
                            }`}
                          >
                            <div className="flex justify-center">
                              <FeatureIcon value={row[vendor.key as keyof ComparisonFeature] as "yes" | "no" | "partial"} />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <CardContent className="pt-6 border-t">
                <div className="flex flex-wrap gap-6 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Full Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Minus className="h-4 w-4 text-yellow-500" />
                    <span>Partial Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span>Not Supported</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <Card className="border-2 border-primary">
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-2">Recommended</Badge>
                  <CardTitle className="text-lg">React PDF Highlighter Plus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary mb-2">Free</p>
                  <p className="text-sm text-muted-foreground">
                    Open source, MIT licensed. No hidden costs or license keys.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">PSPDFKit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">$$$</p>
                  <p className="text-sm text-muted-foreground">
                    Commercial license. Pricing starts at thousands per year.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Apryse (PDFTron)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">$$$</p>
                  <p className="text-sm text-muted-foreground">
                    Commercial license. Enterprise pricing model.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">PDF.js</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">Free</p>
                  <p className="text-sm text-muted-foreground">
                    Open source viewer only. No annotation features built-in.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Other Ways to Support */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Other Ways to Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <GithubIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Star the repository</p>
                  <p className="text-sm text-muted-foreground">
                    Show your appreciation by starring the project on GitHub
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <Code2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Contribute code</p>
                  <p className="text-sm text-muted-foreground">
                    Submit pull requests to help improve the library
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Spread the word</p>
                  <p className="text-sm text-muted-foreground">
                    Share the project with others who might find it useful
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maker's Other Products */}
          <div className="mb-16">
            <h2 className="mb-2 text-center font-display text-2xl font-semibold">
              More from the maker
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Check out other products built by Edward Ha
            </p>
            <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <a
                href="https://www.theworkdocs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                        W
                      </div>
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          TheWorkDocs
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">theworkdocs.com</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="hidden sm:inline-flex">
                      <Rocket className="h-3 w-3 mr-1" />
                      Product
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground mb-4">
                    A powerful documentation and knowledge management platform designed for modern teams.
                    Streamline your workflow with organized, searchable, and collaborative documentation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Documentation</Badge>
                    <Badge variant="outline">Knowledge Base</Badge>
                    <Badge variant="outline">Team Collaboration</Badge>
                  </div>
                </CardContent>
              </a>
            </Card>
          </div>

          {/* Thank You Message */}
          <div className="text-center">
            <p className="text-lg font-medium mb-2">Thank you for your support!</p>
            <p className="text-muted-foreground">
              Every contribution, big or small, helps keep this project alive.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
