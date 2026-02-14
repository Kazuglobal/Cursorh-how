export type ToolId = "cursor" | "claude-code" | "manus"

export type OperatingSystem = "windows" | "macos" | "linux" | "web"

export type SupportLevel = "full" | "partial" | "none" | "via-plugin"

export type PlanType = "free" | "pro" | "business" | "enterprise"

export type PricingModel = "subscription" | "usage-based" | "credit-based"

export type CalloutType = "info" | "warning" | "tip" | "danger" | "success"

export type FeatureCategory =
  | "code-completion"
  | "code-editing"
  | "chat"
  | "agent"
  | "file-operations"
  | "shell-execution"
  | "context-management"
  | "browser-control"
  | "data-analysis"
  | "customization"
  | "collaboration"
  | "model-selection"

export interface ToolInfo {
  readonly id: ToolId
  readonly name: string
  readonly nameEn: string
  readonly tagline: string
  readonly description: string
  readonly developer: string
  readonly category: string
  readonly officialUrl: string
  readonly docsUrl: string
  readonly accentColor: string
  readonly supportedOs: ReadonlyArray<OperatingSystem>
  readonly releaseYear: number
  readonly pricingModel: PricingModel
  readonly highlights: ReadonlyArray<string>
}

export interface ToolFeature {
  readonly id: string
  readonly toolId: ToolId
  readonly name: string
  readonly description: string
  readonly icon: string
  readonly category: FeatureCategory
}

export interface PricingPlan {
  readonly toolId: ToolId
  readonly name: string
  readonly type: PlanType
  readonly price: PlanPrice
  readonly features: ReadonlyArray<PlanFeature>
  readonly recommended: boolean
  readonly ctaText: string
  readonly ctaUrl: string
}

export interface PlanPrice {
  readonly monthly: number | null
  readonly annual: number | null
  readonly currency: string
  readonly note?: string
}

export interface PlanFeature {
  readonly name: string
  readonly value: string | boolean
  readonly highlight: boolean
}

export interface SetupStep {
  readonly stepNumber: number
  readonly title: string
  readonly description: string
  readonly code?: string
  readonly codeLanguage?: string
  readonly callout?: {
    readonly type: CalloutType
    readonly message: string
  }
}

export interface CommonMistake {
  readonly title: string
  readonly description: string
  readonly badExample: string
  readonly goodExample: string
  readonly explanation: string
}

export interface BestPractice {
  readonly title: string
  readonly description: string
  readonly category: string
  readonly priority: "essential" | "recommended" | "advanced"
}
