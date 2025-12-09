import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { toast } from '@/hooks/use-toast';

interface NotesCardProps {
  notes: string;
  topic: string;
}

export function NotesCard({ notes, topic }: NotesCardProps) {
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      
      // Title
      doc.setFontSize(20);
      doc.setTextColor(0, 180, 216);
      doc.text(topic, margin, 25);
      
      // Underline
      doc.setDrawColor(0, 180, 216);
      doc.line(margin, 30, pageWidth - margin, 30);
      
      // Content
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      
      const lines = notes.split('\n');
      let y = 45;
      
      lines.forEach(line => {
        if (line.startsWith('# ')) {
          doc.setFontSize(16);
          doc.setTextColor(0, 150, 180);
          doc.text(line.replace('# ', ''), margin, y);
          y += 10;
        } else if (line.startsWith('## ')) {
          doc.setFontSize(14);
          doc.setTextColor(0, 130, 160);
          doc.text(line.replace('## ', ''), margin, y);
          y += 8;
        } else if (line.startsWith('- ')) {
          doc.setFontSize(11);
          doc.setTextColor(60, 60, 60);
          const bulletLines = doc.splitTextToSize(line, maxWidth - 10);
          doc.text(bulletLines, margin + 5, y);
          y += bulletLines.length * 6;
        } else if (line.trim()) {
          doc.setFontSize(11);
          doc.setTextColor(60, 60, 60);
          const textLines = doc.splitTextToSize(line, maxWidth);
          doc.text(textLines, margin, y);
          y += textLines.length * 6;
        } else {
          y += 4;
        }
        
        // Add new page if needed
        if (y > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          y = 20;
        }
      });
      
      doc.save(`${topic.replace(/\s+/g, '_')}_notes.pdf`);
      
      toast({
        title: 'PDF Downloaded!',
        description: `Notes for "${topic}" saved successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: 'Could not generate PDF. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const renderContent = () => {
    const lines = notes.split('\n');
    const elements: JSX.Element[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-2xl font-bold text-primary mb-4 mt-6 first:mt-0">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl font-semibold text-foreground mb-3 mt-5">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
        if (match) {
          elements.push(
            <div key={index} className="flex items-start gap-3 mb-2 ml-4">
              <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{match[1]}</span>: {match[2]}
              </p>
            </div>
          );
        }
      } else if (line.startsWith('- ')) {
        elements.push(
          <div key={index} className="flex items-start gap-3 mb-2 ml-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <p className="text-muted-foreground">{line.replace('- ', '')}</p>
          </div>
        );
      } else if (line.match(/^\d+\./)) {
        elements.push(
          <p key={index} className="text-muted-foreground mb-2 ml-4">
            {line}
          </p>
        );
      } else if (line.trim()) {
        elements.push(
          <p key={index} className="text-muted-foreground mb-3 leading-relaxed">
            {line}
          </p>
        );
      }
    });
    
    return elements;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Study Notes</h3>
        </div>
        
        <Button
          onClick={handleDownloadPDF}
          variant="outline"
          size="sm"
          className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>
      
      <div className="prose prose-invert max-w-none">
        {renderContent()}
      </div>
    </motion.div>
  );
}
