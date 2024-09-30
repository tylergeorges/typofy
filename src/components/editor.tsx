'use client';

import { useEffect, useRef, useState } from 'react';
import maker from 'makerjs';
import opentype from 'opentype.js';
import { highlightAll } from 'prismjs';
import 'prismjs/components/prism-markup'; // Language
import 'prismjs/themes/prism-tomorrow.css'; // Theme
import { toast } from 'sonner';

import { useDebounceCallback } from '@/hooks/use-debounced-callback';
import { useFont } from '@/hooks/use-font';
import { useClient } from '@/hooks/use-client';
import { formatHtml } from '@/lib/format-html';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SvgRenderer } from '@/components/svg-renderer';
import { Button } from '@/components/ui/button';
import { UploadArea } from '@/components/upload-area';
import { Checkbox, CheckboxRef } from '@/components/ui/checkbox';
import { ColorInput } from '@/components/color-input';

type FillRule = 'nonzero' | 'evenodd';

interface RenderTextConfig {
  font: opentype.Font;
  text: string;
  fontSize: number;
  union: boolean;
  filled: boolean;
  kerning: boolean;
  separate: boolean;
  bezierAccuracy: number;
  units: string;
  fill: string;
  stroke: string;
  strokeWidth: string;
  strokeNonScaling: boolean;
  fillRule: FillRule;
}

export const Editor = () => {
  const textInputRef = useRef<HTMLInputElement>(null!);
  const svgOutputRef = useRef<HTMLTextAreaElement>(null!);
  const svgRendererRef = useRef<HTMLDivElement>(null!);

  const fontSizeRef = useRef<HTMLInputElement>(null!);
  const strokeWidthInputRef = useRef<HTMLInputElement>(null!);
  const filInputRef = useRef<HTMLInputElement>(null!);
  const strokeColorInputRef = useRef<HTMLInputElement>(null!);
  const checkboxRef = useRef<CheckboxRef>(null!);
  const filledCheckboxRef = useRef<CheckboxRef>(null!);

  const isClient = useClient();
  const [currentFont, setCurrentFont] = useState<opentype.Font>();

  useFont('/fonts/GeistVF.woff', font => {
    setCurrentFont(font);
  });

  const handleFontUpload = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const font = opentype.parse(buffer);

    setCurrentFont(font);
  };

  const renderText = async (config: RenderTextConfig) => {
    const svgRenderer = svgRendererRef.current;
    const svgOutput = svgOutputRef.current;

    if (!svgRenderer || !svgOutput) return;

    const {
      bezierAccuracy,
      fill,
      fillRule,
      filled,
      font,
      kerning,
      separate,
      fontSize,
      stroke,
      strokeNonScaling,
      strokeWidth,
      text,
      union,
      units
    } = config;

    const textModel = new maker.models.Text(font, text, fontSize, union, true, bezierAccuracy, {
      kerning,
      features: {
        ss05: true
      }
    });

    if (separate) {
      for (const i in textModel.models) {
        textModel.models[i].layer = i;
      }
    }

    const svg = maker.exporter.toSVG(textModel, {
      fill: filled ? fill : undefined,
      stroke: stroke ? stroke : undefined,
      strokeWidth: strokeWidth ? strokeWidth : undefined,
      fillRule: fillRule ? fillRule : undefined,
      scalingStroke: !strokeNonScaling,
      useSvgPathOnly: true
    });

    const dxf = maker.exporter.toDXF(textModel, { units: units, usePOLYLINE: true });

    const formatted = await formatHtml(svg);
    svgRenderer.innerHTML = svg;
    svgRenderer.setAttribute('data-dxf', dxf);
    svgOutput.textContent = formatted;
    highlightAll();
  };

  const callRenderText = (config: Partial<RenderTextConfig>) => {
    const textAreaEl = textInputRef.current;
    const fontSizeEl = fontSizeRef.current;

    const fillInputEl = filInputRef.current;
    const filledCheckbox = filledCheckboxRef.current;

    const seperateCheckbox = checkboxRef.current;

    const strokeWidthInput = strokeWidthInputRef.current;
    const strokeColorInput = strokeColorInputRef.current;

    const {
      text = textAreaEl ? (textAreaEl.value ?? textAreaEl.defaultValue) : 'Sample',
      font = currentFont,
      bezierAccuracy = 10,
      filled = filledCheckbox.ariaChecked === 'true',
      fill = fillInputEl.value ?? fillInputEl.defaultValue,
      fontSize = fontSizeEl ? parseFloat(fontSizeEl.value) : 16,
      fillRule = 'nonzero',
      kerning = true,
      separate = seperateCheckbox ? Boolean(seperateCheckbox.ariaChecked) : true,
      stroke = strokeWidthInput.value && strokeColorInput ? strokeColorInput.value : 'none',
      strokeNonScaling = true,
      strokeWidth = strokeWidthInput.value,
      union = false,
      units = 'cm'
    } = config;

    if (!font) return;

    renderText({
      font,
      bezierAccuracy,
      fill: fill,
      filled: filled,
      fontSize,
      fillRule,
      kerning,
      separate,
      stroke,
      strokeNonScaling,
      strokeWidth,
      text,
      union,
      units
    });
  };

  const debounceRenderText = useDebounceCallback(callRenderText, 500);

  const initInputRef = (el: HTMLInputElement | null) => {
    const fontSizeEl = fontSizeRef.current;
    if (!fontSizeEl) return;

    if (el) {
      const text = el.value ?? el.defaultValue ?? 'sample';

      if (currentFont) {
        debounceRenderText({
          text
        });
      }

      textInputRef.current = el;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    debounceRenderText({ text });
  };

  const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strokeWidth = e.target.value;

    debounceRenderText({ strokeWidth });
  };

  const handleFillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fill = e.target.value;

    callRenderText({ fill });
  };

  const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strokeColor = e.target.value;

    callRenderText({ stroke: strokeColor });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fontSize = parseInt(e.target.value);

    debounceRenderText({ fontSize });
  };

  const onCheckedChanged = (separate: boolean) => {
    debounceRenderText({ separate });
  };

  const onFilledChange = (filled: boolean) => {
    debounceRenderText({ filled });
  };

  const copy = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const svgOutput = svgOutputRef.current;

    if (!svgOutput) return;

    if (!svgOutput.innerText.trim()) return;

    navigator.clipboard
      .writeText(svgOutput.innerText)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch(err => {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      });
  };

  useEffect(() => {
    highlightAll();
  }, []);

  return (
    <div className="mx-auto size-full max-w-3xl px-2">
      <div className="size-full flex-1 gap-10 px-1 center vertical">
        <div className="grid w-full grid-cols-2 justify-center gap-7">
          <div className="w-full vertical">
            <Label htmlFor="text-input">Text</Label>
            <Input
              defaultValue={'Sample'}
              autoComplete="off"
              spellCheck={false}
              id="text-input"
              ref={initInputRef}
              onChange={handleTextChange}
            />
          </div>

          <div className="vertical">
            <Label htmlFor="font-size">Font Size</Label>
            <Input
              type="number"
              onChange={handleFontSizeChange}
              defaultValue={100}
              id="font-size"
              ref={fontSizeRef}
            />
          </div>

          <div className="row-start-2 w-full vertical">
            <Label htmlFor="fill-input">Fill</Label>
            <ColorInput
              defaultValue="#FFFFFF"
              autoComplete="off"
              spellCheck={false}
              id="fill-input"
              ref={filInputRef}
              onChange={handleFillChange}
            />
          </div>

          <div className="row-start-2 w-full vertical">
            <Label htmlFor="stroke-color-input">Stroke</Label>
            <ColorInput
              defaultValue="#FFFFFF"
              autoComplete="off"
              spellCheck={false}
              id="stroke-color-input"
              ref={strokeColorInputRef}
              onChange={handleStrokeColorChange}
            />
          </div>

          <div className="vertical">
            <Label htmlFor="stroke-width-input">Stroke Width</Label>
            <Input
              type="number"
              onChange={handleStrokeWidthChange}
              defaultValue={0}
              id="stroke-width-input"
              ref={strokeWidthInputRef}
            />
          </div>

          <div className="row-start-3 flex items-center space-x-2">
            <Checkbox
              id="separate"
              defaultChecked={true}
              onCheckedChange={onCheckedChanged}
              ref={checkboxRef}
            />
            <Label htmlFor="separate">Seperate Characters</Label>
          </div>

          <div className="row-start-3 flex items-center space-x-2">
            <Checkbox
              id="filled"
              defaultChecked={true}
              onCheckedChange={onFilledChange}
              ref={filledCheckboxRef}
            />
            <Label htmlFor="filled">Filled</Label>
          </div>

          <div className="col-span-2">
            <UploadArea onUpload={handleFontUpload}>
              <div className="gap-2 vertical">
                <Label htmlFor="upload-font">Upload Font</Label>
                <Button id="upload-font">Chose File</Button>
              </div>
            </UploadArea>
          </div>
        </div>

        <div className="w-full">
          <SvgRenderer ref={svgRendererRef} />
        </div>

        {isClient && (
          <div className="relative size-full max-h-96 max-w-[90%] md:max-w-3xl">
            <pre className="relative size-full max-h-96 max-w-[90%] md:max-w-3xl">
              <code className="language-html" ref={svgOutputRef}>
                {` `}
              </code>
            </pre>
          </div>
        )}

        <div className="w-full vertical">
          <Button onClick={copy}>Copy To Clipboard</Button>
        </div>
      </div>
    </div>
  );
};
