import { cn } from "@/lib/utils"
import type { SetupStep } from "@/types/tools"
import { CodeBlock } from "./code-block"
import { Callout } from "./callout"

interface StepByStepProps {
  readonly steps: ReadonlyArray<SetupStep>
}

export function StepByStep({ steps }: StepByStepProps) {
  return (
    <div className="relative space-y-0">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1

        return (
          <div key={step.stepNumber} className="relative flex gap-4 pb-8">
            <div className="flex flex-col items-center">
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold",
                "border-primary bg-primary text-primary-foreground"
              )}>
                {step.stepNumber}
              </div>
              {!isLast && (
                <div className="w-0.5 flex-1 bg-border mt-2" />
              )}
            </div>

            <div className="flex-1 pb-2">
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {step.description}
              </p>

              {step.code && (
                <CodeBlock
                  code={step.code}
                  language={step.codeLanguage ?? "bash"}
                />
              )}

              {step.callout && (
                <Callout type={step.callout.type}>
                  {step.callout.message}
                </Callout>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
