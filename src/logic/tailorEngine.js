// The Tailoring Logic Engine (Expert Layer)

// Ease calculation dictionary based on garment and fit type
const easeAllowances = {
  'Bodycon Fit': { bust: 0, waist: 0, hip: 0 },
  'Standard Fit': { bust: 2, waist: 1, hip: 2 },
  'Loose Flowy': { bust: 4, waist: 3, hip: 4 }
};

export const tailorEngine = {
  // Drafting Algorithms
  calculateDraftingDimensions: (metrics, garmentType, fitType) => {
    const ease = easeAllowances[fitType] || easeAllowances['Standard Fit'];
    
    const draftedBust = metrics.bust + ease.bust;
    const draftedWaist = metrics.waist + ease.waist;
    const draftedHip = metrics.hip + ease.hip;

    // Armhole depth formula for women (approximate)
    const armholeDepth = (metrics.bust / 4) + 1.5;
    // Half back width based on cross back
    const halfBack = metrics.crossBack / 2;

    return {
      draftedBust,
      draftedWaist,
      draftedHip,
      armholeDepth: parseFloat(armholeDepth.toFixed(2)),
      halfBack: parseFloat(halfBack.toFixed(2)),
      easeApplied: ease
    };
  },

  // The "Problem-Solver" Mode
  solveFitIssue: (issue, posturalNotes) => {
    const lowerIssue = issue.toLowerCase();
    let suggestions = [];

    // Diagnostic logic
    if (lowerIssue.includes('gaping at the neckline') || lowerIssue.includes('bust dart')) {
      suggestions.push('Issue: Excess fabric above the bust apex.');
      suggestions.push('Adjustment: Pinch out the excess at the neckline and rotate it into the bust dart.');
    } else if (lowerIssue.includes('waistband rolling') || lowerIssue.includes('tight across hips')) {
      suggestions.push('Issue: Insufficient ease in the hip area or high waist misaligned.');
      suggestions.push('Adjustment: Let out the side seams at the hip curve or check the waist-to-hip depth.');
    } else if (lowerIssue.includes('diagonal drag lines from shoulder')) {
      if (posturalNotes.some(n => n.toLowerCase().includes('sloping shoulders'))) {
        suggestions.push('Diagnosis: Sloping shoulders causing the fabric to hang heavily.');
        suggestions.push('Adjustment: Lower the shoulder slope on the pattern to match the client.');
      } else {
        suggestions.push('Adjustment: Check if the armhole is too tight or shoulder is too square.');
      }
    } else {
      suggestions.push('Issue not explicitly recognized in expert system.');
      suggestions.push('General Advice: Pin out the excess fabric to determine where the structural imbalance lies.');
    }

    return suggestions;
  }
};
