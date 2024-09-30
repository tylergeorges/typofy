import beautify from 'js-beautify';

export const formatHtml = (htmlString: string) => {
  return beautify.html_beautify(htmlString, {
    indent_size: 4,
    indent_char: ' ',
    indent_with_tabs: true,
    preserve_newlines: true,
    indent_scripts: 'normal',
    end_with_newline: false,
    wrap_line_length: 60,
    indent_inner_html: true,
    indent_empty_lines: false,
    wrap_attributes: 'force-expand-multiline'
  });
};
