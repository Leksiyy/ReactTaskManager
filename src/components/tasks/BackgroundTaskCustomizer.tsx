import { useState, useEffect } from 'react';
import { Form, Input, Slider, ColorPicker, Upload, Button, Radio, Flex, InputNumber, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { Color } from 'antd/es/color-picker';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';


interface BackgroundImageData {
  url?: string;
  opacity?: number;
  size?: string;
  position?: string;
  useOriginalSize?: boolean;
  useCustomSize?: boolean;
  customWidth?: number;
  customHeight?: number;
}

interface BackgroundCustomizerProps {
  initialColor?: string;
  initialImage?: BackgroundImageData;
  onChange: (values: {backgroundColor?: string; backgroundImage?: BackgroundImageData;}) => void;
}


export const BackgroundCustomizer = ({initialColor, initialImage, onChange,}: BackgroundCustomizerProps) => {
  const [useCustomBg, setUseCustomBg] = useState<boolean>(initialColor || (initialImage && initialImage.url) ? true : false);
  const [bgType, setBgType] = useState<"color" | "image">(initialImage && initialImage.url ? "image" : "color");
  const [color, setColor] = useState<string>(initialColor || "#ffffff");
  const [imageUrl, setImageUrl] = useState<string>(initialImage?.url || "");
  const [imageOpacity, setImageOpacity] = useState<number>(initialImage?.opacity || 100);
  const [imageSize, setImageSize] = useState<string>(initialImage?.size || "cover");
  const [imagePosition, setImagePosition] = useState<string>(initialImage?.position || "center");
  const [useOriginalSize, setUseOriginalSize] = useState<boolean>(initialImage?.useOriginalSize || false);
  const [useCustomSize, setUseCustomSize] = useState<boolean>(initialImage?.useCustomSize || false);
  const [customWidth, setCustomWidth] = useState<number>(initialImage?.customWidth || 300);
  const [customHeight, setCustomHeight] = useState<number>(initialImage?.customHeight || 200);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (!useCustomBg) {
      onChange({});
      return;
    }

    if (bgType === "color") {
      onChange({ backgroundColor: color });
    } else if (bgType === "image") {
      let sizeValue = imageSize;
      if (useOriginalSize) {
        sizeValue = "auto";
      } else if (useCustomSize) {
        sizeValue = `${customWidth}px ${customHeight}px`;
      }

      onChange({
        backgroundImage: {
          url: imageUrl,
          opacity: imageOpacity,
          size: sizeValue,
          position: imagePosition,
          useOriginalSize: useOriginalSize,
          useCustomSize: useCustomSize,
          customWidth: customWidth,
          customHeight: customHeight
        },
      });
    }
  }, [useCustomBg, bgType, color, imageUrl, imageOpacity, imageSize, imagePosition, useOriginalSize, useCustomSize, customWidth, customHeight]);

  const handleColorChange = (value: Color) => {
    setColor(value.toHexString());
  };

  const beforeUpload = (file: File) => {
    // Convert to base64 for preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    return false; // Prevent automatic upload
  };

  const uploadProps: UploadProps = {
    beforeUpload,
    fileList,
    onChange(info) {
      setFileList(info.fileList.slice(-1));
    },
    showUploadList: true,
    maxCount: 1,
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Use custom background">
        <Radio.Group value={useCustomBg} onChange={(e) => setUseCustomBg(e.target.value)}>
          <Radio.Button value={true}>Yes</Radio.Button>
          <Radio.Button value={false}>No (Use default)</Radio.Button>
        </Radio.Group>
      </Form.Item>

      {useCustomBg && (
        <>
          <Form.Item label="Background type">
            <Radio.Group value={bgType} onChange={(e) => setBgType(e.target.value)}>
              <Radio.Button value="color">Color</Radio.Button>
              <Radio.Button value="image">Image</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {bgType === 'color' && (
            <Form.Item label="Background color">
              <ColorPicker 
                value={color} 
                onChange={handleColorChange} 
                showText
              />
            </Form.Item>
          )}

          {bgType === 'image' && (
            <>
              <Form.Item label="Image source">
                <Radio.Group defaultValue="upload">
                  <Flex vertical gap={12}>
                    <Radio value="upload">Upload from device</Radio>
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    
                    <Radio value="url">URL from web</Radio>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </Flex>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Image opacity">
                <Slider
                  min={0}
                  max={100}
                  value={imageOpacity}
                  onChange={setImageOpacity}
                />
              </Form.Item>
              
              <Form.Item label="Image size">
                <Radio.Group onChange={(e) => {
                  const value = e.target.value;
                  setUseOriginalSize(value === "original");
                  setUseCustomSize(value === "custom");
                }} value={useOriginalSize ? "original" : (useCustomSize ? "custom" : "scale")}>
                  <Radio value="scale">Scale image</Radio>
                  <Radio value="original">Use original size</Radio>
                  <Radio value="custom">Custom size</Radio>
                </Radio.Group>
              </Form.Item>

              {!useOriginalSize && !useCustomSize && (
                <Form.Item label="Scale type">
                  <Radio.Group value={imageSize} onChange={(e) => setImageSize(e.target.value)}>
                    <Radio.Button value="cover">Cover</Radio.Button>
                    <Radio.Button value="contain">Contain</Radio.Button>
                    <Radio.Button value="100% 100%">Stretch</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              )}

              {useCustomSize && (
                <Form.Item label="Custom dimensions">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Width (px)" noStyle>
                      <InputNumber
                        min={1}
                        max={1000}      // TODO Надо будет Макс подтягивать с заданого Размера карточки 
                        value={customWidth}
                        onChange={(value) => setCustomWidth(value || 300)}
                        style={{ width: '100%' }}
                        addonAfter="px"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Height (px)" noStyle>
                      <InputNumber
                        min={1}
                        max={1000}    // TODO Надо будет Макс подтягивать с заданого Размера карточки 
                        value={customHeight}
                        onChange={(value) => setCustomHeight(value || 200)}
                        style={{ width: '100%' }}
                        addonAfter="px"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              )}

              {(useOriginalSize || useCustomSize) && (
                <Form.Item label="Image position">
                  <Radio.Group value={imagePosition} onChange={(e) => setImagePosition(e.target.value)}>
                    <Radio.Button value="center">Center</Radio.Button>
                    <Radio.Button value="top left">Top Left</Radio.Button>
                    <Radio.Button value="top">Top</Radio.Button>
                    <Radio.Button value="top right">Top Right</Radio.Button>
                    <Radio.Button value="left">Left</Radio.Button>
                    <Radio.Button value="right">Right</Radio.Button>
                    <Radio.Button value="bottom left">Bottom Left</Radio.Button>
                    <Radio.Button value="bottom">Bottom</Radio.Button>
                    <Radio.Button value="bottom right">Bottom Right</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              )}
            </>
          )}
        </>
      )}
    </Form>
  );
};